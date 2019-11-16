import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';

import withRedirectTo from '../../lib/withRedirectTo';
import redirectUnlogged from '../../lib/redirection/redirectUnlogged';
import { getTorrents } from '../../redux/actions/torrents';
import compose from '../../lib/compose';

class Index extends PureComponent {
  static propTypes = {
    torrents: PropTypes.array,
  };

  static async getInitialProps(ctx) {
    await ctx.reduxStore.dispatch(getTorrents());
    return {};
  }

  render() {
    const { torrents } = this.props;
    return (
      <div>
        <h2>Liste des torrents</h2>

        {torrents.map(torrent => (
          <div className="row" key={torrent.hash}>
            <div className="col">{torrent.name}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default compose(
  withRedirectTo(redirectUnlogged),
  connect(state => ({ torrents: get(state, 'torrents.data', []) })),
)(Index);
