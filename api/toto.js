import createApi from './createApi';
import endpoints from './toto.json';
import { resolve } from 'url';

export default token => {
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

  api.sse = {
    /**
     * @returns {EventSource}
     */
    torrents: () =>
      new EventSource(
        `${resolve(
          conf.axiosDefault.baseURL,
          '/sse/torrents',
        )}?x-authorization=${encodeURIComponent(
          defaultHeaders['x-authorization'],
        )}`,
      ),
  };

  api.setToken(token);
  return api;
};
