'use strict';
var bundle;
var bundalo = require('bundalo');
var formatPath = require('kraken-format-path');
var normalocator = require('./normalocator');
var IntlMessageFormat = require('intl-messageformat');

module.exports = function getBundle(req, res, next) {
	var i18n = res.app.kraken.get('i18n');
	if (!bundle) {
		bundle = bundalo({contentPath: i18n.contentPath, fallback: i18n.fallback, formatPath: formatPath});
	}
	var locals = res.locals;
	var locality = normalocator.toStr(locals && locals.context && locals.context.locality || i18n.fallback);
	bundle.get({'bundle': 'messages', 'locality': locality}, function bundleReturn(err, messages) {
		if (err) {
			console.error(err && err.stack || err);
			return next(err);
		}
		res.bundle = intl(messages);
		next();
	});

};

function intl(bundle, locality) {
	bundle.getIntl = function (key, model) {
		var str = bundle.get(key);
		var IntlMsgFormatObj = new IntlMessageFormat(str, locality);
		return IntlMsgFormatObj.format(model);
	};
	return bundle;
}