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
var ps = require('pubsub-js');


module.exports = React.createClass({
    handleCartUpdate: function (cart) {
        this.setState({totalItems: cart.totalItems});
    },
    getInitialState: function () {
        //setInterval(this.handleCartUpdate, 1000);
        return {totalItems: this.props.cart && this.props.cart.totalItems};
    },
    componentDidMount: function () {
        var self = this;
        ps.subscribe('cartUpdate', function (msg, cart) {
            self.handleCartUpdate(cart);
        });
    },
    render: function render() {
        //var totalItems = this.props.totalItems;
        return (<span className='cartCounter'>{this.state.totalItems}</span>);
    }
});