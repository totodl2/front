// eslint-disable-next-line no-unused-vars
import Token from './token';
import setToken from './setToken';

/**
 * @param api
 * @param {Token} token
 * @returns {Token}
 */
const renewToken = async (api, token) => {
  const { data } = await api.tokens.renew({
    data: {
      token: token.jwt,
      refreshToken: token.refreshToken,
    },
  });

  return setToken(api, data.token, token.refreshToken);
};

export default renewToken;
