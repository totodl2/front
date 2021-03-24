import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import InfiniteScroll from 'react-infinite-scroller';

import withRedirectTo from '../../lib/withRedirectTo';
import redirectUnlogged from '../../lib/redirection/redirectUnlogged';
import {
  get as getTorrent,
  remove,
  pause,
  start,
  search,
  getAll as getTorrents,
} from '../../redux/actions/torrents';
import compose from '../../lib/compose';
import TorrentCard from '../../components/presentationals/torrentCard';
import Token from '../../lib/token/token';
import { hasRole, ROLE_ADMIN, ROLE_UPLOADER } from '../../lib/roles';
import ToggleContainer from '../../components/containers/ToggleContainer';
import AddButton from '../../components/presentationals/addButton';
import connectModals from '../../lib/connectModals';
import UploadModal from '../../components/modals/Upload';
import TrackersModal from '../../components/modals/Trackers';
import PlayerModal from '../../components/modals/Player';
import withApi from '../../lib/api/withApi';
import { getMe } from '../../redux/actions/me';
import Input from '../../components/forms/fields/Input/Input';
import Page from '../../components/layouts/page';
import createSources from '../../lib/file/createSources';
import createTracks from '../../lib/file/createTracks';
import withUser from '../../lib/user/withUser';

const PAGE_SIZE = 50;

class Index extends PureComponent {
  static propTypes = {
    torrents: PropTypes.array,
    token: PropTypes.instanceOf(Token),
    getTorrent: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    openUploadModal: PropTypes.func.isRequired,
    openPlayerModal: PropTypes.func.isRequired,
    api: PropTypes.object,
    searchTorrent: PropTypes.func.isRequired,
    openTrackersModal: PropTypes.func.isRequired,
    search: PropTypes.object,
  };

  state = {
    page: 1,
    searching: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.search.searching !== state.searching) {
      return {
        page: 1,
        searching: props.search.searching,
      };
    }
    return null;
  }

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

  loadMore = page => this.setState({ page });

  onSearch = evt => {
    this.props.searchTorrent(evt.target.value);
  };

  onOpenTrackers = torrent => {
    this.props.openTrackersModal({ torrent });
  };

  onPlayFile = file => {
    this.props.openPlayerModal({
      sources: createSources(file),
      tracks: createTracks(file),
      title: file.basename,
    });
  };

  getTorrents = () => {
    const {
      torrents,
      search: { searching, results: found },
    } = this.props;
    const { page } = this.state;

    return (searching
      ? torrents.filter(t => found.indexOf(t.hash) !== -1)
      : torrents
    ).slice(0, page * PAGE_SIZE);
  };

  render() {
    const {
      torrents,
      token,
      search: { searching, keywords, results: found },
    } = this.props;
    const isSiteAdmin = hasRole(token.roles, ROLE_ADMIN);
    const isUploader = hasRole(token.roles, ROLE_UPLOADER);
    const { page } = this.state;

    return (
      <Page className="pt-5">
        <div>
          <div className="d-flex flex-wrap align-items-center mb-3">
            <h2 className="mb-0">Torrents list</h2>
            <Input
              type="text"
              className="ml-auto w-auto"
              placeholder="Search..."
              value={keywords}
              onChange={this.onSearch}
              clearable
            />
          </div>
          <InfiniteScroll
            pageStart={1}
            initialLoad={false}
            hasMore={
              page * PAGE_SIZE < (searching ? found.length : torrents.length)
            }
            loadMore={this.loadMore}
          >
            {this.getTorrents().map(torrent => (
              <ToggleContainer
                view={TorrentCard}
                torrent={torrent}
                key={torrent.hash}
                isAdmin={isSiteAdmin}
                isOwner={isSiteAdmin || token.id === torrent.userId}
                isLoading={torrent.loading}
                onOpen={this.onOpen}
                onPause={this.onPause}
                onStart={this.onStart}
                onRemove={this.onRemove}
                onOpenTrackers={this.onOpenTrackers}
                onPlayFile={this.onPlayFile}
              />
            ))}
          </InfiniteScroll>

          {isUploader && (
            <AddButton className="btn-primary" onClick={this.onUpload} />
          )}
        </div>
      </Page>
    );
  }
}

export default compose(
  withRedirectTo(redirectUnlogged),
  connect(
    state => ({
      torrents: get(state, 'torrents.data', []),
      search: get(state, 'torrents.search', {}),
    }),
    dispatch =>
      bindActionCreators(
        { getTorrent, getMe, remove, pause, start, searchTorrent: search },
        dispatch,
      ),
  ),
  withApi(),
  connectModals({ UploadModal, TrackersModal, PlayerModal }),
  withUser,
)(Index);
