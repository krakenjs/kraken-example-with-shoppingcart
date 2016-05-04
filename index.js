'use strict';


var kraken = require('kraken-js'),
    app = require('express')(),
    options = require('./lib/spec')(),
    nodeJSX = require('node-jsx'),
port = process.env.PORT || 8000;

// install node-jsx, so that we
// can require `.jsx` files in node.
nodeJSX.install({
    extension: '.jsx'
});

app.use(kraken(options));

app.listen(port, function (err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});
