import StorageFactory from './storage';

import { setHeaderContentType } from '../utils/helpers';

class RequestFactory {
  constructor(config) {
    this.config = config;

    this.storage = new StorageFactory();
  }

  authenticate() {
    const config = this.config;
    const storage = this.storage;

    if (config.clientId.length <= 0) {
      throw new Error('You must have a client id set');
    }

    const body = {
      grant_type: config.clientSecret ? 'client_credentials' : 'implicit',
      client_id: config.clientId,
    };

    if (config.clientSecret) {
      body.client_secret = config.clientSecret;
    }

    const promise = new Promise((resolve, reject) => {
      fetch(`${config.protocol}://${config.host}/${config.auth.uri}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Object.keys(body).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`).join('&')
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.json();
          return resolve(data);
        }
        return resolve(response);
      })
      .then(null, error => reject(error));
    });

    promise.then((data) => {
      storage.set('mtoken', data.access_token);
      storage.set('mexpires', data.expires);
    });

    return promise;
  }

  send(uri, method, body) {
    let pushData = body;
    const config = this.config;
    const storage = this.storage;

    const promise = new Promise((resolve, reject) => {
      const tokenIsExpired = Date.now().toString() >= storage.get('mexpires');
      const req = function buildRequest() {
        const headers = {
          'Authorization': `Bearer: ${storage.get('mtoken')}`,
          'Content-Type': setHeaderContentType(uri, method)
        };

        if (config.currency) {
          headers['X-MOLTIN-CURRENCY'] = config.currency;
        }

        if ( method === 'POST' || method === 'PUT' ) {
          pushData = `{"data":${JSON.stringify(body)}}`;
        }

        fetch(`${config.protocol}://${config.host}/${config.version}/${uri}`, {
          body: pushData,
          headers,
          method: method.toUpperCase()
        })
        .then((response) => {
          return resolve(response.json());
        })
        .catch(error => reject(error));
      };

      if (!storage.get('mtoken') || tokenIsExpired) {
        return this.authenticate()
          .then(req)
          .catch(error => reject(error));
      }

      return req();
    });

    return promise;
  }
}

export default RequestFactory;
