'use strict';
var express = require('express'),
	paypal = require('paypal-rest-sdk'),
	db = require('../lib/database');


module.exports = function spec(app) {

	return {
		onconfig: function(config, next) {

			config.get('view engines:js:renderer:arguments').push(app);

			//configure mongodb and paypal sdk
			db.config(config.get('databaseConfig'));
			paypal.configure(config.get('paypalConfig'));

			next(null, config);
		}
	};

};
