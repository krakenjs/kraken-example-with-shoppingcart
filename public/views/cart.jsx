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
        var msgs = this.props.messages.cart;
        return (
          <Layout {...this.props}>
              <main role="main">
                  <div className="products mb2">
                      <h2>{msgs.yourcart}</h2>
                      <p>{this.props.itemsInCart}</p>
                      <ul className="nm-np inline">
                          {this.props.cart.items.map(function (item) {
                              return (
                                <li>
                                    <h3 className="nm-np">{item.qty} x {item.name}</h3>
                                    <h4 className="nm-np">{msgs.price}: {item.prettyPrice} {msgs.each}</h4>
                                </li>
                              );
                          })}
                      </ul>
                  </div>

                  <div className="ccForm inline">
                      <h3>Total: ${this.props.cart.total}</h3>
                      <fieldset>
                          <form method="post" action="/pay">
                              <input name="cc" placeholder="CC #" value="4532649989162709" maxlength="16"/><br/>
                              <input name="expMonth" placeholder="MM" value="12" maxlength="2" size="2"/>
                              <input name="expYear" placeholder="YYYY" value="2018" maxlength="4" size="4"/>
                              <input name="cvv" placeholder="cvv" value="111" maxlength="4" size="4"/><br/>
                              <input name="firstName" value="Ash" placeholder="First Name"/>
                              <input name="lastName" value="Williams" placeholder="Last Name"/><br/>
                              <input type="hidden" name="_csrf" value={csrf}/>
                              <input type="submit" value={msgs.complete}/>
                          </form>
                      </fieldset>
                  </div>
                  <div>
                      <p dangerouslySetInnerHTML={{__html: msgs.paypalNote}} />
                  </div>
              </main>
          </Layout>
        );
    }
});