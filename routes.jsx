/*-------------------------------------------------------------------------------------------------------------------*\
 |  Copyright (C) 2016 PayPal                                                                                          |
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
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var Layout = require('./public/views/layout.jsx');
var Index = require('./public/views/index.jsx');
var Cart = require('./public/views/cart.jsx');
var Result = require('./public/views/result.jsx');
var Products = require('./public/views/products.jsx');

var routes = module.exports = (
  <Router>
	  <Route path='/' component={Layout}>
		  <IndexRoute component={Index} />
		  <Route path='/cart' component={Cart} />
		  <Route path='/products' component={Products} />
	  </Route>
  </Router>
);
