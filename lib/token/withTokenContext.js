import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import createInitialToken from './createInitialToken';

const isServer = typeof window === 'undefined';

export default App =>
  class AppWithTokenProvider extends PureComponent {
    static propTypes = {
      api: PropTypes.object,
      jwt: PropTypes.string,
      refreshToken: PropTypes.string,
    };

    static async getInitialProps(appContext) {
      const token = createInitialToken(appContext.ctx.api, appContext.ctx);

      // eslint-disable-next-line no-param-reassign
      appContext.ctx.token = token;

      let appResults = null;
      if (typeof App.getInitialProps === 'function') {
        appResults = await App.getInitialProps(appContext);
      }

      return {
        jwt: token.jwt,
        refreshToken: token.refreshToken,
        ...(appResults || {}),
      };
    }

    constructor(props) {
      super(props);

      this.token = createInitialToken(
        props.api,
        isServer ? { req: { headers: {} } } : undefined,
        { jwt: props.jwt, refreshToken: props.refreshToken },
      );
    }

    render() {
      const { jwt, refreshToken, ...props } = this.props;
      return <App token={this.token} {...props} />;
    }
  };
