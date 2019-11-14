import nextCookie from 'next-cookies';
import Token from './token';

import configureApi from './configureApi';

/**
 * @param {Object} [ctx]
 * @returns {Token}
 */
export default (api, ctx = {}, rawValues) => {
  let token = null;

  if (rawValues && rawValues.jwt) {
    token = new Token(rawValues.jwt, rawValues.refreshToken);
  } else {
    const { jwt, refresh } = nextCookie(ctx);
    token = new Token(jwt, refresh);
  }

  if (api) {
    configureApi(api, token);
  }

  return token;
};
