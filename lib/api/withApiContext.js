import React, { PureComponent } from 'react';

import createApi from './createApi';

export default App =>
  class AppWithApi extends PureComponent {
    static getInitialProps(appContext) {
      // eslint-disable-next-line no-param-reassign
      appContext.ctx.api = createApi();

      if (typeof App.getInitialProps === 'function') {
        return App.getInitialProps(appContext);
      }

      return null;
    }

    render() {
      return <App {...this.props} />;
    }
  };
