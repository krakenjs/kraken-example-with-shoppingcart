/*-------------------------------------------------------------------------------------------------------------------*\
 |  Copyright (C) 2015 PayPal                                                                                          |
 |                                                                                                                     |
 |  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance     |
 |  with the License.                                                                                                  |
 |                                                                                                                     |
 |  You may obtain a copy of the License at                                                                            |
 |                                                                                                                     |
 |       http://www.apache.org/licenses/LICENSE-2.0                                                                    |
 |                                                                                                                     |
 |  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed   |
 |  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for  |
 |  the specific language governing permissions and limitations under the License.                                     |
 \*-------------------------------------------------------------------------------------------------------------------*/

'use strict';

var React = require('react');
var Store = require('../js/store');


module.exports = React.createClass({
    onCart: function () {
        this.setState(this.getInitialState());
    },
    getInitialState: function () {
        var cartModel = Store.getModel().cart;
        return {totalItems: cartModel && cartModel.totalItems};
    },
    componentDidMount: function () {
        Store.addListener('cartChange', this.onCart);
    },
    componentWillUnmount: function () {
        Store.subtractListener('cartChange', this.onCart);
    },
    render: function render() {
        return (<span className='cartCounter'>{this.state.totalItems}</span>);
    }
});