'use strict';


var Product = require('../models/productModel');


module.exports = function (app) {


	app.get('/', function (req, res) {

		Product.find(function (err, prods) {
			if (err) {
				console.log(err);
			}
            prods.forEach(function(prod) {
                prod.prettyPrice = prod.prettyPrice();
            });
			var model = {
				products: prods
			}
			res.render('index', model);
		})

	});
};
