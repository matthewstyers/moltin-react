const pkg = require('../package.json');

class Config {
  constructor(options) {
    const {
      clientId,
      clientSecret = undefined,
      currency = 'USD',
      debug = false,
      language = false,
      protocol = 'https',
      version = 'v2',
    } = options;
    const host = version === 'v1' ? 'api.molt.in' : 'api.moltin.com';

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.host = host;
    this.port = '443';
    this.protocol = protocol;
    this.version = version;
    this.debug = debug;
    this.currency = currency;
    this.language = language;
    this.timeout = 60000;
    this.auth = {
      expires: 3600,
      uri: 'oauth/access_token',
    };
    this.methods = ['GET', 'POST', 'PUT', 'DELETE'];
    this.sdk = {
      version: pkg.version,
      language: 'JS',
    };
  }

  // helpers; eliminates conflicts with core moltin services
  get client_id() {
    return this.clientId;
  }
  get client_secret() {
    return this.clientSecret;
  }
}

export default Config;
