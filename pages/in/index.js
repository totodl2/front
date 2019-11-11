import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import withRedirectTo from '../../lib/withRedirectTo';
import redirectUnlogged from '../../lib/redirection/redirectUnlogged';
import Menu from '../../components/presentationals/menu/menu';
import Header from '../../components/presentationals/header';

const Index = ({ test, token }) => (
  <>
    <Header onLogout={token.logout}>TotoDownload</Header>
    <div className="alert alert-success my-5">
      Logged{' '}
      <Link href="/">
        <a>yolo</a>
      </Link>{' '}
      -- {test}
      <button type="button" onClick={token.logout}>
        Déconnecter
      </button>
    </div>
  </>
);

Index.propTypes = {
  test: PropTypes.string,
  token: PropTypes.object,
};

export default withRedirectTo(redirectUnlogged)(Index);
