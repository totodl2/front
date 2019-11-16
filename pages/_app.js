import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import NProgress from 'nprogress';
import Router from 'next/router';

import Layout from '../components/site/layout';

import withApiContext from '../lib/api/withApiContext';
import withTokenContext from '../lib/token/withTokenContext';
import withReduxStore from '../redux/withReduxStore';

import ApiProvider from '../lib/api/provider';
import TokenProvider from '../lib/token/provider';

import '../styles/app.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class TotoApp extends App {
  render() {
    const { api, Component, pageProps, reduxStore, token } = this.props;
    return (
      <ApiProvider api={api}>
        <TokenProvider api={api} token={token}>
          <Provider store={reduxStore}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
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
