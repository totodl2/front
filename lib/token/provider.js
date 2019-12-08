import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Provider as ReactProvider } from './context';
import createInitialToken from './createInitialToken';
import Token from './token';
import isServer from '../isServer';
import setToken from './setToken';
import renewToken from './renewToken';

const createRefreshTokenTimer = (token, callback) => {
  if (!token.isLogged() || isServer) {
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
    const token = props.token || createInitialToken(props.api);

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

  onRefreshToken = async () => {
    this.setTokenObject(await renewToken(this.props.api, this.state.token));
  };

  setToken = (jwt, refreshToken) => {
    const newToken = setToken(this.props.api, jwt, refreshToken);
    return this.setTokenObject(newToken);
  };

  setTokenObject = newToken => {
    const { token: oldToken, refreshTimer } = this.state;
    // eslint-disable-next-line no-param-reassign
    newToken.setNewToken = this.setToken;

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

export default Provider;
