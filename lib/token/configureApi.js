const configureApi = (api, token) => {
  api.setToken(token.jwt);
};

export default configureApi;
