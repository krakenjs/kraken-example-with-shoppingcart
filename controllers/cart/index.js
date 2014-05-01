'use strict';
var Product = require('../../models/productModel');

module.exports = function (router) {

	/**
	 * Display the shopping cart
	 */
	router.get('/', function (req, res) {

		//Retrieve the shopping cart from memory
		var cart = req.session.cart,
			displayCart = {items: [], total: 0},
			total = 0;

		if (!cart) {
			res.render('result', {result: 'Your cart is empty!'});
			return;
		}

		//Ready the products for display
		for (var item in cart) {
			displayCart.items.push(cart[item]);
			total += (cart[item].qty * cart[item].price);
		}
		req.session.total = displayCart.total = total.toFixed(2);

		var model =
		{
			cart: displayCart
		};
		console.log(model.cart.items[0]);
		res.render('cart', model);
	});

	/**
	 * Add an item to the shopping cart
	 */
	router.post('/', function (req, res) {

		//Load (or initialize) the cart
		req.session.cart = req.session.cart || {};
		var cart = req.session.cart;

		//Read the incoming product data
		var id = req.param('item_id');

		//Locate the product to be added
		Product.findById(id, function (err, prod) {
			if (err) {
				console.log('Error adding product to cart: ', err);
				res.redirect('/cart');
				return;
			}

			//Add or increase the product quantity in the shopping cart.
			if (cart[id]) {
				cart[id].qty++;
			}
			else {
				cart[id] = {
					name: prod.name,
					price: prod.price,
					prettyPrice: prod.prettyPrice(),
					qty: 1
				};
			}

			res.redirect('/cart');

		});
	});
};
