import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { getMe } from '../../redux/actions/me';
import SSE from '../../components/sse';

export default App =>
  class AppWithSSE extends PureComponent {
    static propTypes = {
      children: PropTypes.any,
    };

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
      const { children, ...props } = this.props;
      return (
        <App {...props}>
          {children}
          <SSE />
        </App>
      );
    }
  };
