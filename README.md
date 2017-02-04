# Moltin React.JS SDK
> The Moltin React SDK is a simple to use interface for the Moltin eCommerce API to help you get off the ground quickly and efficiently within client and server applications. `moltin-react` is a React-friendly derivation of Moltin's [js-sdk](https://github.com/moltin/js-sdk/tree/master) package that makes full use of React's feature set.

📚 [API v1 docs](https://docs.moltin.com/) &mdash; 📚 [API v2 (pre-release) docs](https://moltin.api-docs.io/v2) &mdash; 📚 [moltin.com](https://moltin.com)

## Pre-Release Notice
This package is generally functional but does not currently have full code coverage. Endpoints currently available are:

#### API v1/v2
- [x] Brands
- [x] Cart
- [x] Categories
- [x] Collections
- [x] Currencies
- [x] Gateways
- [x] Orders
- [x] Products

#### API v1
- [ ] Settings
- [ ] Modifiers
- [ ] Checkout
- [ ] Customers
- [ ] Addresses
- [ ] Taxes
- [ ] Shipping
- [ ] Promotions
- [ ] Flows
- [ ] Entries
- [ ] Fields
- [ ] Email Templates
- [ ] Webhooks
- [ ] Images

#### API v2
- [x] Files

## Installation
```sh
npm install --save moltin
```


## Usage
### Option A: MoltinClient
```js
import { MoltinClient } from 'moltin-react';

const Moltin = MoltinClient({
  clientId: 'XXX'
});

// Authenticate the client
Moltin.Authenticate().then((response) => {
  console.log('authenticated', response);
});

```
### Option B: generic constructor
`moltin-react` exports a named object with the above `MoltinClient` instantiator, as well as an uninstantiated `Moltin` class, so the client can also be instantiated as a constructor:

```js

import moltin from 'moltin-react'; // NOTE: unnamed import

const Moltin = new moltin({
  clientId: 'XXX'
});

// same as option A from here on out

Moltin.Authenticate().then((response) => {
  console.log('authenticated', response);
});

```
> **Note:** This requires a [Moltin](http://moltin.com) account.

Once created, `Moltin` in the above example conforms to the standard Moltin JS documentation. Check out the [Moltin wiki](https://github.com/moltin/js-sdk/wiki) to learn more about authenticating and the available endpoints.

## Configuration
On creation, either of the above options takes an identical configuration object, which requires _only_ `clientId` (see [Authentication](https://docs.moltin.com/authenticate)) but which can accept any of the following:

```js
FORMAT: /* <key> // [<default value>], <comment> */
{

  clientId, // required
  clientSecret, // API Secret. Don't utilize unless you're rendering on server.
  currency,
  debug, // [false]
  language, // [false]
  version // ['v1'], API version; also accepts 'v2', which, again, is currently unavailable.
}
```

Additionally, if you're using **webpack**, you'll need to add the following to `webpack.config.js`:

```js
node: {
  fs: 'empty'
}
```

This is a temporary patch and will eventually be replaced with a more react-friendly alternative.

## Troubleshooting
`moltin-react` assumes an ES6-friendly environment and, by default, imports those modules for consolidation into a larger bundle. A react-friendly pre-crunched version is available at `'moltin-react/dist/moltin.cjs'`

## Roadmap
As previously stated, `moltin-react` is pre-release but still usable. Here's what's coming down the pike:

- [ ] full API v1 support
- [ ] flux/redux integration
- [ ] roll-your-own storage manager
- [ ] separation of `localStorage` into modular storage engine
- [ ] higher-order components

## Development

The SDK is built with [ES6 modules](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-modules/) that are bundled into Node and browser compatible files using [Rollup](http://rollupjs.org).

If you want to roll your own bundle, or make changes to any of the modules in `src`, then you'll need to install the package dependencies and build the `dist` files.

```
npm install
npm run build
```

You can learn more about Rollup, the API and configuration  [here](https://github.com/rollup/rollup/wiki).
