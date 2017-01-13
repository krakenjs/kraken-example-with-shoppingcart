# kraken-example-with-shoppingcart

Kraken with Shopping Cart, universal react view rendering, and PayPal integration. Uses [lokijs](https://github.com/techfort/LokiJS) as an in-memory database. 
You can easily swap out for an external database, such as MongoDB.

## Prerequisites
* You will need [Node](http://nodejs.org) (Version >= 4 preferred)

## Installation

Clone, install and run.

```shell
git clone git@github.com:krakenjs/kraken-example-with-shoppingcart.git
cd kraken-example-with-shoppingcart
npm install
npm start
```

## Explore the app

Visit [`http://localhost:8000`](http://localhost:8000)

## Illustrates

* [`anemone-machina`](https://www.npmjs.com/package/anemone-machina) and for universal react view rendering
* [`anemone-lingua`](https://www.npmjs.com/package/anemone-lingua) for localized content (en-US or es-ES) from .properties files
* [`react-router`](https://www.npmjs.com/package/react-router) for URL/view mapping
* [`flux`](https://www.npmjs.com/package/flux) to manage the application lifecycle and architecture
* ['browserify`](https://www.npmjs.com/package/browserify) for browser JavaScript dependency management
* [`bundalo`](https://www.npmjs.com/package/bundalo) for localized messages with model data
* mongodb for storing product information
* Integration with the PayPal SDK

### React components

krakenjs (PayPal's JavaScript open source umbrella) has namespaced important react-related modules under the `anemone` namespace.

#### anemone-machina

The example utilizes `anemone-machina` for rendering views on both the client and server (as an express view engine).

The express view engine is configured in `config/config.json` in this block:

```js
    "express": {
        "view engine": "jsx",
        "view": "require:anemone-machina/lib/expressView",
        "view cache": false,
        "views": "path:./public/views"
    },
    "view engines": {
        "jsx": {
            "module": "anemone-machina/lib/server",
            "renderer": {
                "method": "create",
                "arguments": [
                    {
                        "routes": "require:./routes.jsx",
                        "routesFilePath": "path:./routes.jsx"
                    }
                ]
            }
        }
    },
```

#### anenome-lingua

Configured as a middleware in `config/config.json`:

```js
        "reactContentLoader": {
            "priority": 100,
            "enabled": true,
            "module": {
                "name": "anemone-lingua",
                "arguments": [
                    {
                        "contentPath": "path:./locales",
                        "fallback": "en-US"
                    }
                ]
            }
        }
```

#### react-router

Please see `routes.jsx` for the Router definition. You can see server-rendered views by making a direct get request for any of:
- `/`
- `/products`
- `/cart`

When the application is loaded in the browser, clicking any of the main navigation links will illustrate browser-rendered views.

#### flux

The flux-based patterns can be found in the files under `public/js/*.js`. You can also see the flux listeners pushed down from the `routes.jsx` file.

#### browserify

- The browserify bundle.js build is defined in `Gruntfile.js` as well as `tasks/browserify.js`.
- The development hot-loader [`construx-browserify`](https://www.npmjs.com/package/react-router) for the bundle is configured in `config/development.json`
- The above block also specifies `routes.jsx` as this application makes use of [`react-router`](https://www.npmjs.com/package/react-router).
- The browser react renderer is configured in `public/main.js`


### PayPal SDK

config changes (config.json):

```javascript
"paypalConfig": {
	"host": "api.sandbox.paypal.com",
	"port": "",
	"client_id": "EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM",
	"client_secret": "EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM"
},
```
### onconfig

`lib/spec.js` configures the PayPal SDK upon startup

### Payment

Payment initiated in the `/pay` route which is defined in controllers/pay/index.js

### Localized content

config changes (config.json):
```javascript
"i18n": {
	"contentPath": "path:./locales",
	"fallback": "en-US"
},
```

config changes (config.json) under middleware:
```javascript
"locale": {
	"priority": 95,
	"enabled": true,
	"module": {
		"name": "path:./lib/locale"
	}
}
```

locale is chosen via the `/setLanguage/:locale` route, which is initiated by hyperlinked flag images in the UI

locale is set into the response via the locale middleware defined in `lib/locale.js`

### Localized model data with bundalo

bundalo is used to provide localized messages directly in server responses. The bundle middleware, `lib/getBundle.js`, 
attaches a `bundle` property to the response object.

```js
bundle.get({'bundle': 'messages', 'locality': locality}, function bundleReturn(err, messages) {
		if (err) {
			console.error(err && err.stack || err);
			return next(err);
		}
		res.bundle = intl(messages);
		next();
	});
```

Note the line `res.bundle = intl(messages);`. `intl` is a local method (utilizing [intl-messageformat](https://www.npmjs.com/package/intl-messageformat)) 
that adds an additional getter to the existing bundalo API. 
You can see that in use in `controllers/index.js`:

```js
model.itemsInCart = res.bundle.getIntl('items', {cartItemLength: cartLength});
//combines the given model with the property from messages.properties:
//items=You have {cartItemLength} items in your cart.
```

This combines the property with the given model. `intl-messageformat` can transform the model data based on the user's locale if necessary.
