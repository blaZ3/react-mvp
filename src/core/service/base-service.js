import axios from 'axios';

class BaseService {
  static _config = {
    baseUrl: '',
  };

  static config(config) {
    if (!!config.baseUrl) {
      BaseService._config.baseUrl = config.baseUrl;
    }
  }

  async post(url, body = {}, config = {}) {
    let response, success;

    try {
      response = await axios.post(BaseService._config.baseUrl + url, body, config);
      success = true;
    } catch (e) {
      response = e.response;
      success = false;
    }

    const fatal = !response;
    const data = fatal ? null : response.data;
    const headers = fatal ? null : response.headers;

    return { fatal, data, headers, success };
  }
}

export default BaseService;
