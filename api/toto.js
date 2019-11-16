import createApi from './createApi';
import endpoints from './toto.json';

export default token => {
  const defaultHeaders = {};
  const api = createApi({
    endpoints,
    axiosDefault: {
      headers: defaultHeaders,
      baseURL: process.env.API_URL,
    },
  });

  api.setToken = newToken => {
    if (newToken) {
      defaultHeaders['x-authorization'] = `Bearer ${newToken}`;
    } else {
      delete defaultHeaders['x-authorization'];
    }
    return api;
  };

  api.setToken(token);
  return api;
};
