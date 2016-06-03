'use strict';

module.exports = function (options, cb) {
	options.skipRead = true;
	cb(null, options);
};