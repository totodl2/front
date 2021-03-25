/**
 * Redirect user if he's unlogged
 * @param Token token
 * @returns {string|null}
 */
const redirectUnlogged = token => (!token.isLogged() ? '/' : null);

export default redirectUnlogged;
