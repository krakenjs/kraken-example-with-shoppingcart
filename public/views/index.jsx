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
	componentDidMount: function () {
		Store.addListener('productChange', this.onChange);
		Store.addListener('cartChange', this.onChange);
	},
	componentWillUnmount: function () {
		Store.subtractListener('productChange', this.onChange);
		Store.subtractListener('cartChange', this.onChange);
	},
	onChange: function () {
		this.setState(this.getInitialState());
	},
	addToCart: function (e) {
		e.preventDefault();
		var productObject = {
			item_id: $(e.target).data('productid'),
			_csrf: this.props._csrf
		};
		this.props.route.onAddToCart(productObject);
	},
	render: function render() {
		var msgs = this.props.messages.index;
		var products = this.state.products;
		return (
		  <main role="main" >
			  <p>{msgs.greeting}</p>

			  <div className="products">
				  <ul className="nm-np inline">{
					  (products && products.length > 0) ? products.map(function (product) {
						  console.log('product', product);
						  return (
							<li key={product._id}>
								<form method="POST" action="cart" data-productid={product._id}
									  onSubmit={this.addToCart}>
									<h3 className="nm-np">{product.name}</h3>
									<h4 className="nm-np">{product.prettyPrice}</h4>
									<input type="submit" value={msgs.addToCart}/>
								</form>
							</li>
						  );
					  }.bind(this)) : <li>{msgs.noProducts}</li>
				  }</ul>
			  </div>
		  </main>
		);
	}
});
