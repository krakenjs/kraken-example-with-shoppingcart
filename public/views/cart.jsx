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
        var csrf = this.props._csrf;
        var msgs = this.props.messages.cart;
        console.log('cart', this.props.cart);
        return (

              <main role="main">
                  <div className="products mb2">
                      <h2>{msgs.yourcart}</h2>
                      <p>{this.props.itemsInCart}</p>
                      <ul className="nm-np inline">
                          {this.props.cart.items && this.props.cart.items.items.map(function (item) {
                              return (
                                <li key={item.id || item._id}>
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
                      <p dangerouslySetInnerHTML={{__html: msgs.paypalNote}} />
                  </div>
              </main>
        );
    }
});