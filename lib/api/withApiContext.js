import React, { PureComponent } from 'react';

import createApi from './createApi';

export default App =>
  class AppWithApi extends PureComponent {
    static async getInitialProps(appContext) {
      // eslint-disable-next-line no-param-reassign
      appContext.ctx.api = createApi();

      if (typeof App.getInitialProps === 'function') {
        return App.getInitialProps(appContext);
      }

      return {};
    }

    constructor(props) {
      super(props);
      this.state = {
        api: createApi(),
      };
    }

    render() {
      return <App api={this.state.api} {...this.props} />;
    }
  };
