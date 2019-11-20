import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';

import withRedirectTo from '../../lib/withRedirectTo';
import redirectUnlogged from '../../lib/redirection/redirectUnlogged';
import {
  getAll as getTorrents,
  get as getTorrent,
  remove,
  pause,
  start,
} from '../../redux/actions/torrents';
import compose from '../../lib/compose';
import TorrentCard from '../../components/presentationals/torrentCard';
import Token from '../../lib/token/token';
import { hasRole, ROLE_ADMIN } from '../../lib/roles';
import ToggleContainer from '../../components/containers/ToggleContainer';

class Index extends PureComponent {
  static propTypes = {
    torrents: PropTypes.object,
    token: PropTypes.instanceOf(Token),
    getTorrent: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
  };

  static async getInitialProps(ctx) {
    await ctx.reduxStore.dispatch(getTorrents());
    return {};
  }

  onOpen = async (evt, torrent) => {
    if (torrent.fullyLoaded) {
      return torrent;
    }

    return this.props.getTorrent(torrent.hash);
  };

  onPause = (evt, torrent) => this.props.pause(torrent.hash);

  onStart = (evt, torrent) => this.props.start(torrent.hash);

  onRemove = (evt, torrent) => this.props.remove(torrent.hash);

  render() {
    const { torrents, token } = this.props;
    const isSiteAdmin = hasRole(token.role, ROLE_ADMIN);

    return (
      <div>
        <h2 className="mb-3">Liste des torrents</h2>

        {Object.values(torrents).map((torrent, i) => (
          <ToggleContainer
            view={TorrentCard}
            torrent={torrent}
            key={torrent.hash}
            isAdmin={isSiteAdmin || token.id === torrent.userId}
            isLoading={torrent.loading}
            onOpen={this.onOpen}
            onPause={this.onPause}
            onStart={this.onStart}
            onRemove={this.onRemove}
          />
        ))}
      </div>
    );
  }
}

export default compose(
  withRedirectTo(redirectUnlogged),
  connect(
    state => ({ torrents: get(state, 'torrents.data', []) }),
    dispatch =>
      bindActionCreators({ getTorrent, remove, pause, start }, dispatch),
  ),
)(Index);
