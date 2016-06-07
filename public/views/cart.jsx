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

var Store = require('../js/store');

var $ = require('jquery');

module.exports = React.createClass({
	getInitialState: function () {
		return Store.getModel().cart;
	},
	componentDidMount: function () {
		Store.addListener('cartChange', this.onCart);
	},
	componentWillUnmount: function () {
		Store.subtractListener('cartChange', this.onCart);
	},
	onCart: function () {
		this.setState(this.getInitialState());
	},
	pay: function (e) {
		e.preventDefault();
		var payInfo = {
			  _csrf: this.props._csrf,
			  cc: $(e.target).find('input[name=cc]').val(),
			  expMonth: $(e.target).find('input[name=expMonth]').val(),
			  expYear: $(e.target).find('input[name=expYear]').val(),
			  firstName: $(e.target).find('input[name=firstName]').val(),
			  lastName: $(e.target).find('input[name=lastName]').val()
		};
		this.props.route.onPay(payInfo);
	},
	render: function render() {
		var csrf = this.props._csrf;
		var msgs = this.props.messages.cart;
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
					  <form method="post" onSubmit={this.pay}>
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