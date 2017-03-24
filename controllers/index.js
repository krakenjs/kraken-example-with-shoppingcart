'use strict';


var Product = require('../models/productModel');
var async = require('async');
var paypal = require('paypal-rest-sdk');
var productIds = 0;

module.exports.index = function (req, res, next) {
	modelBuilder(req, res, function (err, model) {
		if (err) {
			return next(err);
		}
		res.render(req.url, model);
	});

};

var modelBuilder = function (req, res, callback) {
	var getCart = function(callback) {
		var displayCart = {items: [], total: 0};
		var sessionCart = req.session.cart;
		var total = 0;
		var totalItems = 0;
		var model = {
			items: null,
			result: null,
			continueMessage: null,
			totalItems:0

		};
		var cartLength = 0;
		if (!sessionCart) {
			model.result = res.bundle.get('empty');
			model.continueMessage = res.bundle.get('keepShopping');

		}
		else {
			//Ready the products for display
			Object.keys(sessionCart).forEach(function (itemid) {
				var item = sessionCart[itemid];
				cartLength += item.qty;
				displayCart.items.push(item);
				total += (item.qty * item.price);
				totalItems += item.qty;
			});

			req.session.total = displayCart.total = total.toFixed(2);
			model.items = displayCart;
			model.totalItems = totalItems;
			model.itemsInCart = res.bundle.getIntl('items', {cartItemLength: cartLength});
		}

		callback(null, model);
	};

	var getProducts = function (callback) {
		var prods = Product.product.find();
			
		prods = prods.map(function (prod) {
			prod.prettyPrice = Product.prettifyPrice(prod);
			return prod;
		});
		var staticProd = [{
			prettyPrice: '$100.00',
			name: 'foo',
			id: 1
		}];
		var model = {
			products: prods,
			title: 'Kraken Store'
		};
		callback(null, model);
	};
	async.parallel({cart: getCart, products: getProducts}, function (err, result) {
		var model = {};

		model.products = result.products.products;
		model.cart = result.cart;
		callback(null, model);
	});
};

module.exports.cart = function (req, res, next) {

	//Load (or initialize) the cart
	req.session.cart = req.session.cart || {};
	var cart = req.session.cart;

	//Read the incoming product data
	var id = req.body.item_id;

	//Locate the product to be added
	var prod = Product.product.find({'_id': Number(id)})[0];

	//Add or increase the product quantity in the shopping cart.
	if (cart[id]) {
		cart[id].qty++;
	}
	else {
		cart[id] = {
			name: prod.name,
			price: prod.price,
			prettyPrice: Product.prettifyPrice(prod),
			qty: 1
		};
	}
	modelBuilder(req, res, function (err, model) {
		if (err) {
			return next(err);
		}
		res.status(200).json(model);
	});


};
module.exports.setLocale = function (req, res) {
		var localeString = req.params.locale;
		var language = localeString.split('-')[1];
		var country = localeString.split('-')[0];
		var localeObject = {language: language, country: country};
		res.cookie('locale', localeObject);
		res.redirect('/');
	};

module.exports.newProduct = function (req, res, next) {
	var name = req.body.name && req.body.name.trim();

	//***** PLEASE READ THIS COMMENT ******\\\
	/*
	 Using floating point numbers to represent currency is a *BAD* idea \\

	 You should be using arbitrary precision libraries like:
	 https://github.com/justmoon/node-bignum instead.

	 So why am I not using it here? At the time of this writing, bignum is tricky to install
	 on Windows-based systems. I opted to make this example accessible to more people, instead
	 of making it mathematically correct.

	 I would strongly advise against using this code in production.
	 You've been warned!
	 */
	var price = parseFloat(req.body.price, 10);

	//Some very lightweight input checking
	if (name === '' || isNaN(price)) {
		res.status(200).json({rekt: true});
		return;
	}
	productIds = productIds + 1;
	var newProduct = Product.product.insert({name: name, price: price, _id: productIds});

	//Show it in console for educational purposes...
	console.log(Product.whatAmI(newProduct));

	/* The call back recieves to more arguments ->product/s that is/are added to the database
	 and number of rows that are affected because of save, which right now are ignored
	 only errors object is consumed*/
	modelBuilder(req, res, function (err, model) {
		if (err) {
			return next(err);
		}
		res.status(200).json(model);
	});
};

module.exports.deleteProduct = function (req, res, next) {
	Product.product.remove(Product.product.find({_id: req.body.item_id}));
	modelBuilder(req, res, function (err, model) {
		if (err) {
			return next(err);
		}
		res.status(200).json(model);
	});

};

module.exports.pay = function (req, res, next) {

	//Read the incoming product data
	var cc = req.body.cc;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var expMonth = req.body.expMonth;
	var expYear = req.body.expYear;
	var cvv = req.body.cvv;

	//Ready the payment information to pass to the PayPal library
	var payment = {
		'intent': 'sale',
		'payer': {
			'payment_method': 'credit_card',
			'funding_instruments': []
		},
		'transactions': []
	};

	// Identify credit card type. Patent pending. Credit cards starting with 3 = amex, 4 = visa, 5 = mc , 6 = discover
	var ccType = (['amex', 'visa', 'mastercard', 'discover'])[parseInt(cc.slice(0, 1), 10) - 3];

	//Set the credit card
	payment.payer.funding_instruments[0] =
	{
		'credit_card': {
			'number': cc,
			'type': ccType,
			'expire_month': expMonth,
			'expire_year': expYear,
			'cvv2': cvv,
			'first_name': firstName,
			'last_name': lastName
		}
	};

	//Set the total to charge the customer
	payment.transactions[0] = {
		amount: {
			total: req.session.total,
			currency: 'USD'
		},
		description: 'Your Kraken Store Purchase'
	};

	//Execute the payment.
	paypal.payment.create(payment, {}, function (err, resp) {
		if (err) {
			console.log(err);
			res.status(200).json({
				result: res.bundle.get('paymentError'),
				continueMessage: res.bundle.get('tryAgain')
			});
			return;
		}

		if (resp) {
			delete req.session.cart;
			delete req.session.displayCart;
			modelBuilder(req, res, function (err, model) {
				if (err) {
					return next(err);
				}
				model.cart.result =  res.bundle.get('paymentSuccess');
				model.cart.continueMessage = res.bundle.get('keepShopping');
				res.status(200).json(model);
			});

		}
	});
};
