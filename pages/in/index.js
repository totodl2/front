import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import { Plus } from 'react-feather';

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
import { hasRole, ROLE_ADMIN, ROLE_UPLOADER } from '../../lib/roles';
import ToggleContainer from '../../components/containers/ToggleContainer';
import Torrents from '../../components/sse/torrents';
import AddButton from '../../components/presentationals/addButton';
import connectModals from '../../lib/connectModals';
import UploadModal from '../../components/modals/Upload';
import withApi from '../../lib/api/withApi';

class Index extends PureComponent {
  static propTypes = {
    torrents: PropTypes.array,
    token: PropTypes.instanceOf(Token),
    getTorrent: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    openUploadModal: PropTypes.func.isRequired,
    api: PropTypes.object,
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

  onUpload = () => this.props.openUploadModal({ api: this.props.api });

  render() {
    const { torrents, token } = this.props;
    const isSiteAdmin = hasRole(token.roles, ROLE_ADMIN);
    const isUploader = hasRole(token.roles, ROLE_UPLOADER);

    return (
      <div>
        <div className="d-flex align-items-center mb-3">
          <h2 className="mb-0">Liste des torrents</h2>
          {isUploader && (
            <button
              type="button"
              className="btn btn-outline-primary ml-auto"
              onClick={this.onUpload}
            >
              <Plus /> Add torrents
            </button>
          )}
        </div>
        {torrents.map(torrent => (
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
        {isUploader && (
          <AddButton className="btn-primary" onClick={this.onUpload} />
        )}
        <Torrents />
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
  withApi(),
  connectModals({ UploadModal }),
)(Index);
