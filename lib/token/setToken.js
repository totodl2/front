import cookie from 'js-cookie';

import Token from './token';
import configureApi from './configureApi';
import isServer from '../isServer';

const setToken = (api, jwt, refreshToken) => {
  const newToken = new Token(jwt, refreshToken);
  configureApi(api, newToken);

  if (!isServer) {
    if (jwt) {
      cookie.set('jwt', jwt);
      cookie.set('refresh', refreshToken);
    } else {
      cookie.remove('jwt');
      cookie.remove('refresh');
    }
  }

  return newToken;
};

export default setToken;
