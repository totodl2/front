import React, { PureComponent } from 'react';
import createInitialToken from './createInitialToken';

export default App =>
  class AppWithTokenProvider extends PureComponent {
    static getInitialProps(appContext) {
      // eslint-disable-next-line no-param-reassign
      appContext.ctx.token = createInitialToken(
        appContext.ctx.api,
        appContext.ctx,
      );

      if (typeof App.getInitialProps === 'function') {
        return App.getInitialProps(appContext);
      }

      return null;
    }

    render() {
      return <App {...this.props} />;
    }
  };
