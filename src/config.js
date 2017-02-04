class Config {
  constructor(options) {
    const {
      clientId,
      clientSecret,
      currency,
      debug = false,
      language = false,
      protocol = 'https',
      version = 'v1'
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
      uri: 'oauth/access_token'
    };
    this.methods = ['GET', 'POST', 'PUT', 'DELETE'];
  }
}

export default Config;
