'use strict';

/*───────────────────────────────────────────────────────────────────────────*\
 │  Copyright (C) 2016 PayPal                                                  │
 │                                                                             │
 │hh ,'""`.                                                                    │
 │  / _  _ \  Licensed under the Apache License, Version 2.0 (the "License");  │
 │  |(@)(@)|  you may not use this file except in compliance with the License. │
 │  )  __  (  You may obtain a copy of the License at                          │
 │ /,'))((`.\                                                                  │
 │(( ((  )) ))    http://www.apache.org/licenses/LICENSE-2.0                   │
 │ `\ `)(' /'                                                                  │
 │                                                                             │
 │   Unless required by applicable law or agreed to in writing, software       │
 │   distributed under the License is distributed on an "AS IS" BASIS,         │
 │   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
 │   See the License for the specific language governing permissions and       │
 │   limitations under the License.                                            │
 \*───────────────────────────────────────────────────────────────────────────*/

var browserify = require('browserify');

module.exports = function (options) {
	options.precompile = function (options, cb) {
			options.skipRead = true;
			cb(null, options);
		};
	return function (data, args, callback) {

		//is this requested file in our map?

		if (!options.bundles.hasOwnProperty(args.context.filePath)) {
			return callback(new Error('construx-browserify doesn\'t know how to process ' + args.context.filePath));
		}
		var opts = options.bundles[args.context.filePath];

		browserify(opts.src, opts.options || {})
		  .bundle(function (err, buf) {
			  if (err) {
				  return callback(err);
			  }
			  callback(null, buf.toString());
		  });
	}
};

