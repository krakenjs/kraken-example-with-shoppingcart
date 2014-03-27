'use strict';


//var SetlanguageModel = require('../models/setLanguage');


module.exports = function (app) {

    //var model = new SetlanguageModel();


	app.get('/setLanguage/:locale', function (req, res) {
        res.cookie('locale', req.params.locale);
        res.redirect('/');
    });

};
