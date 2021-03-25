import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import withToken from './token/withToken';
import Token from './token/token';

function redirect(to, res) {
  if (res) {
    res.writeHead(302, {
      Location: to,
    });
    res.end();
    return;
  }
  Router.push(to);
}

/**
 * @param {function(Token):string} getRedirection
 * @returns {function(*): function(*): function(*): *}
 */
const withRedirectTo = getRedirection => Component =>
  withToken()(
    class WithRedirectTo extends PureComponent {
      static propTypes = {
        token: PropTypes.instanceOf(Token).isRequired,
      };

      static async getInitialProps(ctx) {
        const { token, res } = ctx;
        const to = await getRedirection(token);

        if (to) {
          redirect(to, res);
          return {};
        }

        return typeof Component.getInitialProps === 'function'
          ? Component.getInitialProps(ctx)
          : {};
      }

      render() {
        return <Component {...this.props} />;
      }
    },
  );

export default withRedirectTo;
