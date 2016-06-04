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
var ps = require('pubsub-js');

module.exports = React.createClass({
	getInitialState: function () {
		return {requestInProgress: false};
	},
	componentDidMount: function () {
		ps.subscribe('startRequest', function (msg, evt) {
			console.log('startRequest', evt.message);
			this.setState({requestInProgress: true, progressMessage: evt.message});
		}.bind(this));
		ps.subscribe('endRequest', function (msg, evt) {
			console.log('endRequest', evt.message);
			this.setState({requestInProgress: false, progressMessage: evt.message});
		}.bind(this));
	},
	render: function render() {
		if (this.state.requestInProgress) {
			return (<div className='statusWidget'><h2>{this.state.progressMessage}</h2></div>)
		}
		return null;
	}
});
