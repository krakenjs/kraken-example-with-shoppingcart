var bundle;
var bundalo = require('bundalo');
module.exports = function getBundle(req, res, next) {
	var i18n = res.app.kraken.get('i18n');
	var engine = res.app.kraken.get('bundle engine');
	//console.log("bundle", bundle);
	if (bundle === undefined) {
		console.log("bundle was undefined!!");
		bundle = bundalo({'contentPath': i18n.contentPath, 'fallback': i18n.fallback, 'engine': engine});
	}
	res.bundle = bundle;
	next();
};