'use strict';


var loki = require('lokijs');
var db = new loki('product');
var products = db.addCollection('product', {indices: ['_id']});
var local;

module.exports = local = {
    product: products,
    prettifyPrice: function (prod) {
        return (prod && prod.price) ? '$' + prod.price.toFixed(2) : '$';
    },
    whatAmI: function (prod) {
        var greeting = prod.name ?
            'Hello, I\'m a ' + prod.name + ' and I\'m worth ' + local.prettifyPrice(prod)
            : 'I don\'t have a name :(';
        return greeting;
    }
};