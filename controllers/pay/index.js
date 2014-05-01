'use strict';
var paypal = require('paypal-rest-sdk');

module.exports = function (server) {

	/**
	 * Send information to PayPal
	 */
	server.post('/', function (req, res) {

		//Read the incoming product data
		var cc = req.param('cc'),
			firstName = req.param('firstName'),
			lastName = req.param('lastName'),
			expMonth = req.param('expMonth'),
			expYear = req.param('expYear'),
			cvv = req.param('cvv');

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
		var ccType = (['amex','visa','mastercard','discover'])[parseInt(cc.slice(0,1),10)-3];

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
				res.render('result',{result:'Error :('});
				return;
			}

			if (resp) {
				delete req.session.cart;
				delete req.session.displayCart;
				res.render('result',{result:'Success :)'});
			}
		});
	});
};