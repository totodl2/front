import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';

import configureApi from './configureApi';
import { Provider as ReactProvider } from './context';
import createInitialToken from './createInitialToken';
import Token from './token';
import withApi from '../api/withApi';

const isServer = typeof window === 'undefined';

const createRefreshTokenTimer = (token, callback) => {
  if (!token.isLogged()) {
    return null;
  }
  return setTimeout(callback, token.expires.getTime() - Date.now());
};

class Provider extends PureComponent {
  static propTypes = {
    token: PropTypes.instanceOf(Token),
    children: PropTypes.node,
    api: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const token =
      props.token ||
      createInitialToken(
        props.api,
        isServer ? { req: { headers: {} } } : undefined,
      );
    token.setNewToken = this.setToken;
    this.state = {
      token,
      refreshTimer: createRefreshTokenTimer(token, this.onRefreshToken),
    };
  }

  componentWillUnmount() {
    if (this.state.refreshTimer) {
      clearTimeout(this.state.refreshTimer);
    }
    if (this.state.token) {
      this.state.token.setNewToken = null;
    }
  }

  onRefreshToken = () => {
    /* @todo refresh mechanism */
  };

  setToken = (jwt, refreshToken) => {
    const { token: oldToken, refreshTimer } = this.state;
    const newToken = new Token(jwt, refreshToken);
    configureApi(this.props.api, newToken);
    newToken.setNewToken = this.setToken;

    if (!isServer) {
      if (jwt) {
        cookie.set('jwt', jwt);
        cookie.set('refresh', refreshToken);
      } else {
        cookie.remove('jwt');
        cookie.remove('refresh');
      }
    }

    if (oldToken) {
      oldToken.setNewToken = null;
    }

    if (refreshTimer) {
      clearTimeout(refreshTimer);
    }

    this.setState({
      token: newToken,
      refreshTimer: !isServer
        ? createRefreshTokenTimer(newToken, this.onRefreshToken)
        : null,
    });

    return newToken;
  };

  render() {
    return (
      <ReactProvider value={this.state.token}>
        {this.props.children}
      </ReactProvider>
    );
  }
}

export default withApi()(Provider);
