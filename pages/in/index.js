import React from 'react';

import withRedirectTo from '../../lib/withRedirectTo';
import redirectUnlogged from '../../lib/redirection/redirectUnlogged';

const Index = () => (
  <div>
    <h2>Liste des torrents</h2>
    <div className="row">
      <div className="col">Torrent 1</div>
    </div>
  </div>
);

export default withRedirectTo(redirectUnlogged)(Index);
