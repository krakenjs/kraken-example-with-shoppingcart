'use strict';
var paypal = require('paypal-rest-sdk');
var getBundle = require('../../lib/getBundle');


module.exports = function (router) {

	/**
	 * Send information to PayPal
	 */
	router.post('/', getBundle, function (req, res) {

		//Read the incoming product data
		var cc = req.param('cc');
		var firstName = req.param('firstName');
		var lastName = req.param('lastName');
		var expMonth = req.param('expMonth');
		var expYear = req.param('expYear');
		var cvv = req.param('cvv');
		var locals = res.locals;
		var i18n = res.app.kraken.get('i18n');
		var locality = locals && locals.context && locals.context.locality || i18n.fallback;

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
				res.bundle.get({'bundle': 'messages', 'model': {}, 'locality': locality}, function bundleReturn(err, messages) {
					res.render('result', {'result': messages.paymentError, 'continueMessage': messages.tryAgain});
				});
				return;
			}

			if (resp) {
				delete req.session.cart;
				delete req.session.displayCart;
				res.bundle.get({'bundle': 'messages', 'model': {}, 'locality': locality}, function bundleReturn(err, messages) {
					res.render('result', {'result': messages.paymentSuccess, 'continueMessage': messages.keepShopping});
				});
			}
		});
	});
};