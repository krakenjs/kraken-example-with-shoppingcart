var Dispatcher = require('./dispatcher');
var Constants = require('./constants');
var Actions = {

	addProduct: function(product) {
		//update application
		Dispatcher.dispatch({
			actionType: Constants.PRODUCT_CREATE,
			product: product
		});
	},
	deleteProduct: function(product) {
		//update application
		Dispatcher.dispatch({
			actionType: Constants.PRODUCT_DELETE,
			product: product
		});
	},
	addToCart: function(product) {
		//update application
		Dispatcher.dispatch({
			actionType: Constants.CART_ADD,
			product: product
		});
	},
	initiatePayment: function(payInfo) {
		//update application
		Dispatcher.dispatch({
			actionType: Constants.PAYMENT_INITIATE,
			payInfo: payInfo
		});
	}

};

module.exports = Actions;