'use strict';

var mongoose = require('mongoose');

var productModel = function () {

    //Define a super simple schema for our products.
    var productSchema = mongoose.Schema({
        name: String,
        price: Number,
        prettyPrice: String
    });

    //Verbose toString method
    productSchema.methods.whatAmI = function () {
        var greeting = this.name ?
            'Hello, I\'m a ' + this.name + ' and I\'m worth ' + this.prettifyPrice()
            : 'I don\'t have a name :(';
        return greeting;
    };

    //Format the price of the product to show a dollar sign, and two decimal places
    productSchema.methods.prettifyPrice = function () {
        return (this && this.price) ? '$' + this.price.toFixed(2) : '$';
    };

    return mongoose.model('Product', productSchema);

};

module.exports = new productModel();
