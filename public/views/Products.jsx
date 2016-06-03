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


module.exports = React.createClass({
    render: function render() {
        var msgs = this.props.messages.products;
        var csrf = this.props._csrf;
        var products = this.props.products;
        return (
              <main role="main">
                  <h2>{msgs.title}</h2>
                  <div className="mb2">
                      <fieldset>
                          <legend>{msgs.addProduct}</legend>
                          <form method="POST" action="/products">
                              <input name="name" placeholder="Product Name"/><br />
                              <input name="price" placeholder="Price"/><br />
                              <input type="hidden" name="_csrf" value={csrf}/>
                              <input type="submit" value="Save"/>
                          </form>
                      </fieldset>
                  </div>

                  <div className="products">
                      <fieldset>
                          <legend>{msgs.productList}</legend>
                          <ul className="nm-np inline">
                              {(products && products.length > 0) ? products.map(function (product) {
                                  console.log('product', product);
                                  return (
                                    <li key={product.id || product._id}>
                                      <form method="POST" action="/products">
                                          <input type="hidden" name="item_id" value={product.id || product._id}/>
                                          <h3 className="nm-np">{product.name}</h3>
                                          <h4 className="nm-np">{product.prettyPrice}</h4>
                                          <h5 className="nm-np tiny">{product.id || product._id}</h5>
                                          <input type="submit" value="Delete"/>
                                          {/*If we don't at the Cross-Site Request Forgey token, this POST will be rejected*/}
                                          <input type="hidden" name="_csrf" value={csrf}/>
                                          <input type="hidden" name="_method" value="DELETE"/>
                                      </form>
                                  </li>
                                  );
                              }) : msgs.noProducts}
                          </ul>
                      </fieldset>
                  </div>
              </main>
        );
    }
});
