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
var Store = require('../js/store');

module.exports = React.createClass({
	getInitialState: function () {
		return {requestInProgress: false};
	},
	onPaymentInit: function () {
		this.setState({requestInProgress: true, progressMessage: this.props.messages.messages.paymentInProgress});
	},
	onPaymentComplete: function () {
		this.setState({requestInProgress: false, progressMessage: ''});
	},
	componentDidMount: function () {
		Store.addListener('paymentInit', this.onPaymentInit);
		Store.addListener('paymentComplete', this.onPaymentComplete);
	},
	componentWillUnmount: function () {
		Store.subtractListener('paymentInit', this.onPaymentInit);
		Store.subtractListener('paymentComplete', this.onPaymentComplete);
	},
	render: function render() {
		if (this.state.requestInProgress) {
			return (<div className='statusWidget'><h2>{this.state.progressMessage}</h2></div>)
		}
		return null;
	}
});
