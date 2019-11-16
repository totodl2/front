/**
 * Redirect user if he's logged
 * @param Token token
 * @returns {string|null}
 */
export default token => (token.isLogged() ? '/in' : null);
