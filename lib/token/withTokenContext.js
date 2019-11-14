import React, { PureComponent } from 'react';
import createInitialToken from './createInitialToken';

export default App =>
  class AppWithTokenProvider extends PureComponent {
    static getInitialProps(appContext) {
      const token = createInitialToken(appContext.ctx.api, appContext.ctx);

      // eslint-disable-next-line no-param-reassign
      appContext.ctx.token = token;

      let appResults = null;
      if (typeof App.getInitialProps === 'function') {
        appResults = App.getInitialProps(appContext);
      }

      return {
        jwt: token.jwt,
        refreshToken: token.refreshToken,
        ...(appResults || {}),
      };
    }

    render() {
      return <App {...this.props} />;
    }
  };
