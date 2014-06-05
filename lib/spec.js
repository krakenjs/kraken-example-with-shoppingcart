'use strict';
var express = require('express'),
	paypal = require('paypal-rest-sdk'),
	db = require('../lib/database');


module.exports = function spec() {

	return {
		onconfig: function(config, next) {

			//configure mongodb and paypal sdk
			db.config(config.get('databaseConfig'));
			paypal.configure(config.get('paypalConfig'));

			next(null, config);
		}
	};

};
