import 'fetch-everywhere';
import 'es6-promise';

import Config from './config';
import RequestFactory from './factories/request';
import StorageFactory from './factories/storage';

import BrandsEndpoint from './endpoints/brands';
import CartEndpoint from './endpoints/cart';
import CategoriesEndpoint from './endpoints/categories';
import CollectionsEndpoint from './endpoints/collections';
import CurrenciesEndpoint from './endpoints/currencies';
import FilesEndpoint from './endpoints/files';
import GatewaysEndpoint from './endpoints/gateways';
import LegacyProductsEndpoint from './endpoints/legacyProducts';
import OrdersEndpoint from './endpoints/orders';
import ProductsEndpoint from './endpoints/products';
import SettingsEndpoint from './endpoints/settings';

export default class Moltin {
  constructor(config) {
    const { version } = config;
    this.config = config;
    this.request = new RequestFactory(config);
    this.storage = new StorageFactory();

    this.Brands = new BrandsEndpoint(config);
    this.Cart = new CartEndpoint(config);
    this.Categories = new CategoriesEndpoint(config);
    this.Collections = new CollectionsEndpoint(config);
    this.Currencies = new CurrenciesEndpoint(config);
    this.Gateways = new GatewaysEndpoint(config);
    this.Orders = new OrdersEndpoint(config);

    if (version === 'v1') {
      this.Products = new LegacyProductsEndpoint(config);
      this.Settings = new SettingsEndpoint(config);
      this.Images = new FilesEndpoint(config);

    } else {
      this.Files = new FilesEndpoint(config);
      this.Products = new ProductsEndpoint(config);

    }
  }

  // Expose `authenticate` function on the Moltin class
  Authenticate() {
    return this.request.authenticate();
  }
}

// Export a function to instantiate the Moltin class
export const MoltinClient = (config) => new Moltin(new Config(config));
