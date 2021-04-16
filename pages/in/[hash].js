import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import { ReactComponent as ChevronLeft } from 'feather-icons/dist/icons/chevron-left.svg';
import Link from 'next/link';

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
import { hasRole, ROLE_ADMIN } from '../../lib/roles';
import connectModals from '../../lib/connectModals';
import TrackersModal from '../../components/modals/Trackers';
import PlayerModal from '../../components/modals/Player';
import withApi from '../../lib/api/withApi';
import { getMe } from '../../redux/actions/me';
import Page from '../../components/layouts/page';
import withUserPreloading from '../../lib/user/withUserPreloading';
import MetadataContainer from '../../components/containers/MetadataContainer';
import MovieMetadataModal from '../../components/modals/Metadata/movie';
import TranscoderContainer from '../../components/containers/TranscoderContainer';
import TvMetadataModal from '../../components/modals/Metadata/tv';
import ErrorPage from '../../components/site/error';

class Index extends PureComponent {
  static propTypes = {
    token: PropTypes.instanceOf(Token),
    remove: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    openPlayerModal: PropTypes.func.isRequired,
    openMovieMetadataModal: PropTypes.func.isRequired,
    openTvMetadataModal: PropTypes.func.isRequired,
    openTrackersModal: PropTypes.func.isRequired,
    torrent: PropTypes.object,
  };

  static async getInitialProps(ctx) {
    const props = { hash: ctx.query.hash };
    await ctx.reduxStore.dispatch(getTorrents());
    await ctx.reduxStore.dispatch(getTorrent(props.hash));
    return props;
  }

  onPause = (evt, torrent) => this.props.pause(torrent.hash);

  onStart = (evt, torrent) => this.props.start(torrent.hash);

  onRemove = (evt, torrent) => this.props.remove(torrent.hash);

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

  render() {
    const { torrent, token } = this.props;
    const isSiteAdmin = hasRole(token.roles, ROLE_ADMIN);

    if (!torrent) {
      return (
        <ErrorPage message="Torrent not found" title="Not found" status={404} />
      );
    }

    return (
      <MetadataContainer>
        {({ removeMetadata: onRemoveMetadata, remove: removeMetadata }) => (
          <Page className="pt-5">
            <div>
              <div className="d-flex flex-wrap align-items-center mb-3">
                <Link passHref prefetch={false} href="/in">
                  <a className="align-items-center d-flex">
                    <ChevronLeft />
                    Torrents list
                  </a>
                </Link>
              </div>
              <TranscoderContainer>
                {({ loading, transcode }) => (
                  <TorrentCard
                    torrent={torrent}
                    isAdmin={isSiteAdmin}
                    isOwner={isSiteAdmin || token.id === torrent.userId}
                    isLoading={
                      torrent.loading || removeMetadata.loading || loading
                    }
                    onPause={this.onPause}
                    onStart={this.onStart}
                    onRemove={this.onRemove}
                    onOpenTrackers={this.onOpenTrackers}
                    onPlayFile={this.onPlayFile}
                    onRemoveMetadata={onRemoveMetadata}
                    onChangeMovieMetadata={this.onChangeMovieMetadata}
                    onChangeTvMetadata={this.onChangeTvMetadata}
                    onTranscode={transcode}
                    isOpen
                  />
                )}
              </TranscoderContainer>
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
    (state, { hash }) => {
      const torrent = get(state, 'torrents.data', []).filter(
        t => t.hash === hash,
      );
      return {
        torrent: torrent.length > 0 ? torrent[0] : null,
      };
    },
    dispatch =>
      bindActionCreators(
        { getTorrent, getMe, remove, pause, start, searchTorrent: search },
        dispatch,
      ),
  ),
  withApi(),
  connectModals({
    TrackersModal,
    PlayerModal,
    MovieMetadataModal,
    TvMetadataModal,
  }),
  withUserPreloading,
)(Index);
