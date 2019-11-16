import React from 'react';
import PropTypes from 'prop-types';

import { initializeStore } from './store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(api, initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(api, initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(api, initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

const withReduxStore = App =>
  class AppWithRedux extends React.Component {
    static propTypes = {
      initialReduxState: PropTypes.object,
      api: PropTypes.object,
    };

    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore(appContext.ctx.api);
      // Provide the store to getInitialProps of pages
      // eslint-disable-next-line no-param-reassign
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.api, props.initialReduxState);
    }

    render() {
      const { initialReduxState, ...props } = this.props;
      return <App {...props} reduxStore={this.reduxStore} />;
    }
  };

export default withReduxStore;
