'use strict';


var Product = require('../models/productModel');


module.exports = function (router) {


	router.get('/', function (req, res) {

		Product.find(function (err, prods) {
			if (err) {
				console.log(err);
			}
            prods.forEach(function(prod) {
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
		var language = req.params.locale.split('-')[1];
		var country = req.params.locale.split('-')[0];
        res.cookie('locale', {language: language, country: country});
        res.redirect('/');
    });
};
