/**
 * Redirect user if he's logged
 * @param Token token
 * @returns {string|null}
 */
const redirectLogged = token => (token.isLogged() ? '/in' : null);
export default redirectLogged;
