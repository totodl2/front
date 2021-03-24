import React, { PureComponent } from 'react';

import { getMe } from '../../redux/actions/me';
import SSE from '../../components/sse';

export default App =>
  class AppWithSSE extends PureComponent {
    static async getInitialProps(appContext) {
      let initialProps = {};

      if (typeof App.getInitialProps === 'function') {
        initialProps = await App.getInitialProps(appContext);
      }

      if (appContext.ctx.token && appContext.ctx.token.isLogged()) {
        await appContext.ctx.reduxStore.dispatch(getMe());
      }

      return initialProps;
    }

    render() {
      return (
        <>
          <App {...this.props}></App>
          <SSE />
        </>
      );
    }
  };
