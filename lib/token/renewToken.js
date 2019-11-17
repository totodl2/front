// eslint-disable-next-line no-unused-vars
import Token from './token';
import configureApi from './configureApi';
import setToken from './setToken';

/**
 * @param api
 * @param {Token} token
 * @returns {Token}
 */
const renewToken = async (api, token) => {
  const { data } = await api.tokens.renew({
    token: token.jwt,
    refreshToken: token.refreshToken,
  });

  const newToken = setToken(api, data.token, token.refreshToken);
  configureApi(api, newToken);

  return newToken;
};

export default renewToken;
