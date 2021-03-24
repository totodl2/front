import React, { PureComponent } from 'react';

import { getMe } from '../../redux/actions/me';

export default App =>
  class AppWithUser extends PureComponent {
    static async getInitialProps(appContext) {
      let initialProps = {};

      if (typeof App.getInitialProps === 'function') {
        initialProps = await App.getInitialProps(appContext);
      }

      if (appContext.token && appContext.token.isLogged()) {
        await appContext.reduxStore.dispatch(getMe());
      }

      return initialProps;
    }

    render() {
      return <App {...this.props} />;
    }
  };
