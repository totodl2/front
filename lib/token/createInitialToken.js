import nextCookie from 'next-cookies';
// eslint-disable-next-line no-unused-vars
import Token from './token';

import setToken from './setToken';

/**
 * @param {Object} [ctx]
 * @returns {Token}
 */
export default (api, ctx = {}, rawValues) => {
  let jwt = null;
  let refreshToken = null;

  if (rawValues) {
    jwt = rawValues.jwt;
    refreshToken = rawValues.refreshToken;
  } else {
    const cookies = nextCookie(ctx);
    jwt = cookies.jwt;
    refreshToken = cookies.refresh;
  }

  return setToken(api, jwt, refreshToken);
};
