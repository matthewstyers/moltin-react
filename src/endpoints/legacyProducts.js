import CatalogueExtend from '../extends/catalogue';

class LegacyProductsEndpoint extends CatalogueExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'products';
  }

  AddModifier(id, body) {
    return this.request.send(`${this.endpoint}/${id}/modifiers`, 'POST', [body]);
  }

  AddVariation(product, modifier, body) {
    return this.request.send(`${this.endpoint}/${product}/modifiers/${modifier}/variations`, 'POST', [body]);
  }

  DeleteModifier(product, modifier) {
    return this.request.send(`${this.endpoint}/${product}/modifiers/${modifier}`, 'DELETE');
  }

  DeleteVariation(product, modifier, variation) {
    return this.request.send(`${this.endpoint}/${product}/modifiers/${modifier}/variations/${variation}`, 'DELETE');
  }

  ListVariations(product) {
    return this.request.send(`${this.endpoint}/${product}/variations`, 'GET');
  }
}

export default LegacyProductsEndpoint;
