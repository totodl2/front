import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import NProgress from 'nprogress';
import Router from 'next/router';

import withApiContext from '../lib/api/withApiContext';
import withTokenContext from '../lib/token/withTokenContext';
import withReduxStoreContext from '../lib/withReduxStoreContext';

import ApiProvider from '../lib/api/provider';
import TokenProvider from '../lib/token/provider';

import '../styles/app.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class TotoApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <ApiProvider>
        <TokenProvider>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </TokenProvider>
      </ApiProvider>
    );
  }
}

export default compose(
  withApiContext,
  withTokenContext,
  withReduxStoreContext,
)(TotoApp);
