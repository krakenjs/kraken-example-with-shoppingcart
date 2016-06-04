'use strict';

//var mainController = require('./controller/index');
var getBundle = require('./lib/getBundle');
var controllers = require('./controllers/index');
module.exports = function (router) {
	router.get('/setLanguage/:locale', controllers.setLocale);
	router.get(/(.*cart|.*products|\/)/, getBundle, controllers.index);
	router.post('/cart', getBundle, controllers.cart);
	router.post('/products', getBundle, controllers.newProduct);
	router.post('/pay', getBundle, controllers.pay);
	router.delete('/products', getBundle, controllers.deleteProduct);
};
