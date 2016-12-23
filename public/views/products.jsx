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
var $ = require('jquery');
var Store = require('../js/store');

module.exports = React.createClass({
    getInitialState: function () {
        return {products: Store.getModel().products};
    },
    render: function render() {
        var msgs = this.props.messages.products;
        var csrf = this.props._csrf;
        var products = this.state.products;
        return (
              <main role="main">
                  <h2>{msgs.title}</h2>
                  <div className="mb2">
                      <fieldset>
                          <legend>{msgs.addProduct}</legend>
                          <form method="POST" action="products"
                                onSubmit={this.save}>
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
                                        <form method="POST" action="products"
                                              onSubmit={this.delete}>
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
                              }.bind(this)) : msgs.noProducts}
                          </ul>
                      </fieldset>
                  </div>
              </main>
        );
    },
    save: function(e) {
        e.preventDefault();
        var name = $(e.target).find('input[name=name]').val();
        var price = $(e.target).find('input[name=price]').val();
        var _csrf = this.props._csrf;
        this.props.route.onSave({name: name, price: price, _csrf: _csrf});
    },
    delete: function (e) {
        e.preventDefault();
        var item_id = $(e.target).find('input[name=item_id]').val();
        var _csrf = this.props._csrf;
        this.props.route.onDelete({item_id: item_id, _csrf: _csrf, _method: 'DELETE'});
    },
    componentDidMount: function() {
        Store.addListener('productChange', this.onChange);
    },

    componentWillUnmount: function() {
        Store.subtractListener('productChange', this.onChange);
    },
    onChange: function () {
        this.setState(this.getInitialState());
    }
});
