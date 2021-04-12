import { resolve } from 'url';
import createApi from './createApi';
import endpoints from './toto.json';

const createTotoApi = token => {
  const defaultHeaders = {};
  const conf = {
    endpoints,
    axiosDefault: {
      headers: defaultHeaders,
      baseURL: process.env.API_URL,
    },
  };

  const api = createApi(conf);

  api.setToken = newToken => {
    if (newToken) {
      defaultHeaders['x-authorization'] = `Bearer ${newToken}`;
    } else {
      delete defaultHeaders['x-authorization'];
    }
    return api;
  };

  /**
   * @returns {EventSource}
   */
  api.sse = () =>
    new EventSource(
      `${resolve(
        conf.axiosDefault.baseURL,
        '/sse',
      )}?x-authorization=${encodeURIComponent(
        defaultHeaders['x-authorization'],
      )}`,
    );

  api.setToken(token);
  return api;
};

export default createTotoApi;
