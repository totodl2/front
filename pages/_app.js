import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { compose } from 'redux';

import withApiContext from '../lib/api/withApiContext';
import withTokenContext from '../lib/token/withTokenContext';
import withReduxStore from '../lib/withReduxStore';

import ApiProvider from '../lib/api/provider';
import TokenProvider from '../lib/token/provider';

import '../styles/app.scss';

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
  withReduxStore,
)(TotoApp);
