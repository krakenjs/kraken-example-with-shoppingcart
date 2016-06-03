'use strict';

//var mainController = require('./controller/index');
var getBundle = require('./lib/getBundle');
var controllers = require('./controllers/index');
module.exports = function (router) {
	router.get('/setLanguage/:locale', controllers.setLocale);
	router.get('*', getBundle, controllers.index);
	router.post('/cart', getBundle, controllers.cart);
	router.post('/products', controllers.newProduct);
	router.post('/pay', getBundle, controllers.pay);
	router.delete('/products', controllers.deleteProduct);
};
