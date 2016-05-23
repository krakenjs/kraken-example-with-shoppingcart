'use strict';


var Product = require('../models/productModel');


module.exports = function (router) {


	router.get('/', function (req, res) {

		Product.find(function (err, prods) {
			if (err) {
				console.log(err);
			}
			prods.forEach(function (prod) {
				prod.prettyPrice = prod.prettyPrice();
			});
			var model = {
				products: prods,
				title: 'Kraken Store'
			};
			res.render('index', model);
		});

	});

	router.get('/setLanguage/:locale', function (req, res) {
		var localeString = req.params.locale;
		var language = localeString.split('-')[1];
		var country = localeString.split('-')[0];
		var localeObject = {language: language, country: country};
		res.cookie('locale', localeObject);
		res.redirect('/');
	});
};
