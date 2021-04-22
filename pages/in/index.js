import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import InfiniteScroll from 'react-infinite-scroller';
import { ReactComponent as Person } from 'feather-icons/dist/icons/user.svg';
import { ReactComponent as X } from 'feather-icons/dist/icons/x.svg';
import cl from 'classnames';

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
import Input from '../../components/forms/fields/Input';
import Page from '../../components/layouts/page';
import withUserPreloading from '../../lib/user/withUserPreloading';
import MetadataContainer from '../../components/containers/MetadataContainer';
import MovieMetadataModal from '../../components/modals/Metadata/movie';
import TranscoderContainer from '../../components/containers/TranscoderContainer';
import TvMetadataModal from '../../components/modals/Metadata/tv';

const PAGE_SIZE = 10;

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
    openMovieMetadataModal: PropTypes.func.isRequired,
    openTvMetadataModal: PropTypes.func.isRequired,
    api: PropTypes.object,
    searchTorrent: PropTypes.func.isRequired,
    openTrackersModal: PropTypes.func.isRequired,
    search: PropTypes.object,
    user: PropTypes.object,
  };

  state = {
    page: 1,
    keywords: '',
  };

  static getDerivedStateFromProps(props, state) {
    if (props.search.keywords !== state.keywords) {
      return {
        page: 1,
        keywords: props.search.keywords,
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

  onClear = () => {
    this.props.searchTorrent('');
  };

  onOpenTrackers = torrent => {
    this.props.openTrackersModal({ torrent });
  };

  onPlayFile = file => {
    this.props.openPlayerModal({
      file,
      title: file.basename,
    });
  };

  onChangeMovieMetadata = file => {
    this.props.openMovieMetadataModal({ file });
  };

  onChangeTvMetadata = (files, onClosed) => {
    this.props.openTvMetadataModal({ files }, onClosed);
  };

  getMyUploadsKeyword = () => `user:${this.props.user.nickname}`;

  toggleShowMyUploads = () => {
    const {
      search: { keywords },
    } = this.props;
    const myUploadsKeyword = this.getMyUploadsKeyword();
    this.props.searchTorrent(
      keywords === myUploadsKeyword ? '' : myUploadsKeyword,
    );
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
    const myUploadsKeyword = this.getMyUploadsKeyword();
    const isSearchingMyUploads = myUploadsKeyword === keywords;

    return (
      <MetadataContainer>
        {({ removeMetadata: onRemoveMetadata, remove: removeMetadata }) => (
          <Page className="pt-5">
            <div>
              <div className="d-flex flex-wrap align-items-center mb-3">
                <h2 className="mb-0">Torrents list</h2>
                {isUploader && (
                  <button
                    type="button"
                    className={cl('ml-auto btn d-none d-md-block', {
                      'btn-dark': isSearchingMyUploads,
                      'btn-outline-dark': !isSearchingMyUploads,
                    })}
                    onClick={this.toggleShowMyUploads}
                  >
                    {!isSearchingMyUploads && <Person className="mr-2" />}
                    {isSearchingMyUploads && <X className="mr-2" />}
                    My uploads
                  </button>
                )}
                <Input
                  type="text"
                  wrapperClassName={cl('w-auto', {
                    'ml-auto': !isUploader,
                    'ml-auto ml-md-2': isUploader,
                  })}
                  placeholder="Search..."
                  value={keywords || ''}
                  onChange={this.onSearch}
                  onClear={this.onClear}
                />
              </div>
              <InfiniteScroll
                pageStart={1}
                initialLoad={false}
                hasMore={
                  page * PAGE_SIZE <
                  (searching ? found.length : torrents.length)
                }
                loadMore={this.loadMore}
              >
                {this.getTorrents().map(torrent => (
                  <TranscoderContainer key={torrent.hash}>
                    {({ loading, transcode }) => (
                      <ToggleContainer
                        view={TorrentCard}
                        torrent={torrent}
                        isAdmin={isSiteAdmin}
                        isOwner={isSiteAdmin || token.id === torrent.userId}
                        isLoading={
                          torrent.loading || removeMetadata.loading || loading
                        }
                        onOpen={this.onOpen}
                        onPause={this.onPause}
                        onStart={this.onStart}
                        onRemove={this.onRemove}
                        onOpenTrackers={this.onOpenTrackers}
                        onPlayFile={this.onPlayFile}
                        onRemoveMetadata={onRemoveMetadata}
                        onChangeMovieMetadata={this.onChangeMovieMetadata}
                        onChangeTvMetadata={this.onChangeTvMetadata}
                        onTranscode={transcode}
                      />
                    )}
                  </TranscoderContainer>
                ))}
              </InfiniteScroll>

              {isUploader && (
                <AddButton className="btn-primary" onClick={this.onUpload} />
              )}
            </div>
          </Page>
        )}
      </MetadataContainer>
    );
  }
}

export default compose(
  withRedirectTo(redirectUnlogged),
  connect(
    state => ({
      torrents: get(state, 'torrents.data', []),
      search: get(state, 'torrents.search', {}),
      user: get(state, 'me.data', {}),
    }),
    dispatch =>
      bindActionCreators(
        { getTorrent, getMe, remove, pause, start, searchTorrent: search },
        dispatch,
      ),
  ),
  withApi(),
  connectModals({
    UploadModal,
    TrackersModal,
    PlayerModal,
    MovieMetadataModal,
    TvMetadataModal,
  }),
  withUserPreloading,
)(Index);
