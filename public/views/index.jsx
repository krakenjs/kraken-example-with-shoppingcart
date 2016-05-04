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

var Layout = require('./layout.jsx');
var React = require('react');

module.exports = React.createClass({

    render: function render() {
        var csrf = this.props._csrf;
        var msgs = this.props.messages.index;
        return (
            <Layout {...this.props}>
                <main role="main">
                    <p>{msgs.greeting}</p>

                    <div className="products">
                        <ul className="nm-np inline">
                            {(this.props.products && this.props.products.length > 0) ? this.props.products.map(function (product) {
                                return (
                                  <li>
                                      <form method="POST" action="cart">
                                          <input type="hidden" name="item_id" value={product.id}/>
                                          <h3 className="nm-np">{product.name}</h3>
                                          <h4 className="nm-np">{product.prettyPrice}</h4>
                                          <input type="submit" value={msgs.addToCart}/>
                                          <input type="hidden" name="_csrf" value={csrf}/>
                                      </form>
                                  </li>
                                );
                            }) : <li>{msgs.noProducts}</li>}
                        </ul>
                    </div>
                </main>
            </Layout>
        );
    }
});
