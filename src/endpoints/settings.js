import BaseExtend from '../extends/base';

class SettingsEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'settings';
  }

  List() {
    return this.request.send(`${this.endpoint}`, 'GET');
  }

  Update(body) {
    return this.request.send(`${this.endpoint}`, 'PUT', body);
  }

}

export default SettingsEndpoint;
