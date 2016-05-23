'use strict';

module.exports = {
	toStr: function (input) {
		if (typeof input === 'string') {
			return input;
		}
		return (input.language + '-' + input.country);

	},
	toObj: function (input) {
		if (typeof input === 'string') {
			return {language: input.split('-')[0], country: input.split('-')[1]};
		}
		return input;
	}

};
