'use strict';
var express = require('express'),
	paypal = require('paypal-rest-sdk');
	
module.exports = function spec() {

	return {
		onconfig: function(config, next) {
			//configure paypal sdk
			paypal.configure(config.get('paypalConfig'));
			next(null, config);
		}
	};

};
