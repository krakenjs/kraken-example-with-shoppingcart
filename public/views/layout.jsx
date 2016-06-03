/*-------------------------------------------------------------------------------------------------------------------*\
 |  Copyright (C) 2015 PayPal                                                                                          |
 |                                                                                                                     |
 |  Licensed under the Apache License, Version 2.0 (the 'License'); you may not use this file except in compliance     |
 |  with the License.                                                                                                  |
 |                                                                                                                     |
 |  You may obtain a copy of the License at                                                                            |
 |                                                                                                                     |
 |       http://www.apache.org/licenses/LICENSE-2.0                                                                    |
 |                                                                                                                     |
 |  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed   |
 |  on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for  |
 |  the specific language governing permissions and limitations under the License.                                     |
 \*-------------------------------------------------------------------------------------------------------------------*/

'use strict';

var React = require('react');
var Router = require('react-router');
var CartWidget = require('./cartWidget.jsx');
var ps = require('pubsub-js');
module.exports = React.createClass({
    handleCartUpdate: function (totalItems) {
        this.setState({totalItems: totalItems});
    },
    getInitialState: function () {
        //setInterval(this.handleCartUpdate, 1000);
        return {totalItems: this.props.cart && this.props.cart.totalItems};
    },
    componentDidMount: function () {
        var self = this;
        ps.subscribe('cartUpdate', function (msg, items) {
            self.handleCartUpdate(items);
        });
    },
    componentWillUnmount: function () {

    },
    render: function render() {
        var msgs = this.props.messages['layouts/master'];
        var self = this;
        return (
            <html lang='en' className='nm-np'>
                <head>
                    <meta charSet='utf-8'/>
                    <title>{msgs.storeName}</title>
                    <link rel='stylesheet' href='/css/app.css'/>
                    <script src='/bundle.js'></script>
                </head>
                <body className='nm-np'>
                <header className='grey'>
                    <div className='wrapper'>
                        <h1>{msgs.storeName}</h1>
                        <nav>
                            <ul className='nm-np inline'>
                                <li>
                                    <Router.Link to='/'>{msgs.buy}</Router.Link>
                                </li>
                                <li>
                                    <Router.Link to='/products'>{msgs.edit}</Router.Link>
                                </li>
                                <li>
                                    <Router.Link to='/cart'>{msgs.cart}</Router.Link>
                                    <CartWidget totalItems={self.state.totalItems}/>
                                </li>
                            </ul>
                        </nav>
                        <div className='lang'>
                            <ul className='nm-np inline'>
                                <li><a href='/setLanguage/EN-us'><img src='/img/us.png' alt='English'/></a></li>
                                <li><a href='/setLanguage/ES-es'><img src='/img/es.png' alt='Spanish'/></a></li>
                            </ul>
                        </div>
                    </div>
                </header>
                <div className='wrapper'>{this.props.children}</div>
                <div id='tentacle'></div>
                </body>
            </html>
        );
    }
});
