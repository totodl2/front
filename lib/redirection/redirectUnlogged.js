/**
 * Redirect user if he's unlogged
 * @param Token token
 * @returns {string|null}
 */
export default token => (!token.isLogged() ? '/' : null);
