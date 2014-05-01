'use strict';
module.exports = function () {
    return function (req, res, next) {
        console.info('setting locale to:', req.cookies.locale);
        var locale = req.cookies && req.cookies.locale;
        //Set the locality for this response. The template will pick the appropriate bundle
        res.locals.context = {
            locality: locale
        };
        next();
    };
};