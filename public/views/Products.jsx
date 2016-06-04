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
var store = require('../store');
var ps = require('pubsub-js');

module.exports = React.createClass({
    getInitialState: function () {
        return store && store.products && {products: store.products} || {products: this.props.products};
    },
    handleAdd: function (e) {
        var self = this;
        e.preventDefault();
        console.log('submit!', e);
        $.ajax({
            url: '/products',
            type: 'POST',
            dataType: 'json',
            data: {
                _csrf: this.props._csrf,
                name: $(e.target).find('input[name=name]').val(),
                price: $(e.target).find('input[name=price]').val()
            },
            cache: false,
            success: function (data) {
                console.log('data', data);
                store.products = data.products;
                self.setState({products: data.products});
                ps.publish('productsUpdate', data.products);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleDelete: function (e) {
        var self = this;
        e.preventDefault();
        console.log('delete!', e);
        $.ajax({
            url: '/products',
            type: 'POST',
            dataType: 'json',
            data: {
                _csrf: this.props._csrf,
                _method: 'DELETE',
                item_id: $(e.target).find('input[name=item_id]').val()
            },
            cache: false,
            success: function (data) {
                console.log('data', data);
                store.products = data.products;
                self.setState({products: data.products});
                ps.publish('productsUpdate', data.products);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function render() {
        var msgs = this.props.messages.products;
        var csrf = this.props._csrf;
        var products = this.state.products;
        var self = this;
        return (
              <main role="main">
                  <h2>{msgs.title}</h2>
                  <div className="mb2">
                      <fieldset>
                          <legend>{msgs.addProduct}</legend>
                          <form method="POST" action="products"
                                onSubmit={self.handleAdd}>
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
                                              onSubmit={self.handleDelete}>
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
