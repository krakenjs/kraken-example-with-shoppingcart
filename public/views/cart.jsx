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
var Router = require('react-router');

var ps = require('pubsub-js');
var store = require('../store');
var $ = require('jquery');

module.exports = React.createClass({
	getInitialState: function () {
		return store && store.cart || this.props.cart;
	},
	componentDidMount: function () {
		var self = this;
		this.cartUpdate = ps.subscribe('cartUpdate', function (msg, items) {
			//self.handleCartUpdate(items);
		});
	},
	componentWillUnmount: function () {
		ps.unsubscribe(this.cartUpdate);
	},
	handleSubmit: function (e) {
		var self = this;
		e.preventDefault();
		console.log('submit!', e);
		$.ajax({
			url: '/pay',
			type: 'POST',
			dataType: 'json',
			data: {
				_csrf: this.props._csrf,
				cc: $(e.target).find('input[name=cc]').val(),
				expMonth: $(e.target).find('input[name=expMonth]').val(),
				expYear: $(e.target).find('input[name=expYear]').val(),
				firstName: $(e.target).find('input[name=firstName]').val(),
				lastName: $(e.target).find('input[name=lastName]').val()},
			cache: false,
			success: function (data) {
				console.log('data', data);
				delete store.cart;
				self.setState(data.cart);
				ps.publish('cartUpdate', data.cart);
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render: function render() {
		var csrf = this.props._csrf;
		var msgs = this.props.messages.cart;
		var self = this;
		console.log('cart', this.state);
		if (!this.state.items) {
			return (
			  <main role="main">
				  <h2>{this.state.result}</h2>
				  <Router.Link to='/'>{this.state.continueMessage}</Router.Link>

			  </main>
			)
		}
		return (

		  <main role="main">
			  <div className="products mb2">
				  <h2>{msgs.yourcart}</h2>
				  <p>{this.state.itemsInCart}</p>
				  <ul className="nm-np inline">
					  {this.state.items && this.state.items.items.map(function (item, idx) {
						  return (
							<li key={idx}>
								<h3 className="nm-np">{item.qty} x {item.name}</h3>
								<h4 className="nm-np">{msgs.price}: {item.prettyPrice} {msgs.each}</h4>
							</li>
						  );
					  })}
				  </ul>
			  </div>

			  <div className="ccForm inline">
				  <h3>Total: {this.state.total}</h3>
				  <fieldset>
					  <form method="post" onSubmit={self.handleSubmit}>
						  <input name="cc" placeholder="CC #" defaultValue="4532649989162709" maxLength="16"/><br/>
						  <input name="expMonth" placeholder="MM" defaultValue="12" maxLength="2" size="2"/>
						  <input name="expYear" placeholder="YYYY" defaultValue="2018" maxLength="4" size="4"/>
						  <input name="cvv" placeholder="cvv" defaultValue="111" maxLength="4" size="4"/><br/>
						  <input name="firstName" defaultValue="Ash" placeholder="First Name"/>
						  <input name="lastName" defaultValue="Williams" placeholder="Last Name"/><br/>
						  <input type="hidden" name="_csrf" defaultValue={csrf}/>
						  <input type="submit" defaultValue={msgs.complete}/>
					  </form>
				  </fieldset>
			  </div>
			  <div>
				  <p dangerouslySetInnerHTML={{__html: msgs.paypalNote}}/>
			  </div>
		  </main>
		);
	}
});