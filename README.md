# with.shoppingcart

Kraken with Shopping Cart and PayPal integration

## Prerequisites
* This example requires that [MongoDB](http://www.mongodb.org/downloads) is installed and running on it's default port.
* You will -- of course -- need [Node](http://nodejs.org) (Version >= 0.10.22 preferred)

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

* [`anemone-machina`](https://www.npmjs.com/package/anemone-machina) and for isomorphic react view rendering
* [`anemone-lingua`](https://www.npmjs.com/package/anemone-lingua) for localized content (en-US or es-ES) from .properties files
* [`react-router`](https://www.npmjs.com/package/react-router) for URL/view mapping
* [`flux`](https://www.npmjs.com/package/flux) to manage the application lifecycle and architecture
* ['browserify`](https://www.npmjs.com/package/browserify) for browser JavaScript dependency management
* [`bundalo`](https://www.npmjs.com/package/bundalo) for localized messages with model data
* mongodb for storing product information
* Integration with the PayPal SDK

### React components

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

### mongodb

Pre-requisite: An instance of [MongoDB](http://www.mongodb.org/downloads) installed and running on its default port.

config changes (config.json):
```javascript
"databaseConfig": {
	"host": "localhost",
	"database": "shocart"
},
```

`lib/database.js`: configure and connect to mongodb instance
`lib/spec.js`: call database.js config method in the kraken-js onconfig event

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

config changes (config.json):
```javascript
"bundle engine": "dust",
```

bundle is configured as middleware directly in routes where it is required, as in `controllers/cart/index.js` and `controllers/pay/index.js`

bundle middleware defined in `lib/getBundle.js`. Note that the 'bundle' object is attached to the response object for use in the downstream response handlers

Server included localized content can be seen after payment, and also on the cart page.
