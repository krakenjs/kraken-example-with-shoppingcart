'use strict';

module.exports = function () {
    return function (req, res, next) {
        if (req.body && req.body._method) {
            req.method = req.body._method;
        }
        next();
    };
};