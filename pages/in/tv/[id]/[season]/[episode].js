import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cl from 'classnames';
import get from 'lodash/get';
import Router from 'next/router';
import { ReactComponent as ChevronLeft } from 'feather-icons/dist/icons/chevron-left.svg';
import { ReactComponent as Download } from 'feather-icons/dist/icons/download.svg';
import { ReactComponent as UploadCloud } from 'feather-icons/dist/icons/upload-cloud.svg';
import Link from 'next/link';

import { getConfiguration } from '../../../../../redux/actions/metadataConfiguration';
import { getCurrent } from '../../../../../redux/actions/tvCurrent';
import compose from '../../../../../lib/compose';
import withRedirectTo from '../../../../../lib/withRedirectTo';
import redirectUnlogged from '../../../../../lib/redirection/redirectUnlogged';
import BackdropImage from '../../../../../components/presentationals/backdropImage';
import Page from '../../../../../components/layouts/page';
import File from '../../../../../components/presentationals/torrentCard/files/file';
import connectModals from '../../../../../lib/connectModals';
import PlayerModal from '../../../../../components/modals/Player';
import createSources from '../../../../../lib/file/createSources';
import createTracks from '../../../../../lib/file/createTracks';
import Actor from '../../../../../components/presentationals/actor';
import ErrorPage from '../../../../../components/site/error';
import WaveLoader from '../../../../../components/presentationals/waveLoader';
import withUserPreloading from '../../../../../lib/user/withUserPreloading';
import { hasRole, ROLE_ADMIN, ROLE_UPLOADER } from '../../../../../lib/roles';
import withToken from '../../../../../lib/token/withToken';
import Token from '../../../../../lib/token/token';
import MetadataModal from '../../../../../components/modals/Metadata';
import MetadataContainer from '../../../../../components/containers/MetadataContainer';
import TranscoderContainer from '../../../../../components/containers/TranscoderContainer';
import UploadModal from '../../../../../components/modals/Upload';
import withApi from '../../../../../lib/api/withApi';
import Player from '../../../../../components/video/Player';
import Playlist from '../../../../../components/presentationals/playlist/playlist';
import PlaylistItem from '../../../../../components/presentationals/playlist/playlistItem';
import getEpisodeNumberLabel from '../../../../../lib/episode/getEpisodeNumberLabel';

import styles from './episode.module.scss';
import findEpisode from '../../../../../lib/episode/findEpisode';

const getStreamableFiles = episode => {
  const files = episode.files || [];
  return files.filter(
    file => (file.transcoded || []).filter(f => f.type === 'media').length > 0,
  );
};

const defaultState = { sources: [], tracks: [], id: null };

class TvEpisode extends PureComponent {
  static propTypes = {
    tvId: PropTypes.number.isRequired,
    configuration: PropTypes.object.isRequired,
    openPlayerModal: PropTypes.func.isRequired,
    tv: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.object,
      error: PropTypes.object,
    }),
    season: PropTypes.shape({
      seasonNumber: PropTypes.number,
      name: PropTypes.string,
    }),
    episode: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      episodeNumber: PropTypes.number,
      name: PropTypes.string,
      guestStars: PropTypes.arrayOf(
        PropTypes.shape({
          character: PropTypes.string,
          id: PropTypes.string,
          person: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            profilePath: PropTypes.string,
          }),
        }),
      ),
      files: PropTypes.arrayOf(PropTypes.object),
    }),
    token: PropTypes.instanceOf(Token),
    openMetadataModal: PropTypes.func.isRequired,
    openUploadModal: PropTypes.func.isRequired,
    api: PropTypes.object,
  };

  state = defaultState;

  static async getInitialProps(appContext) {
    const props = {
      tvId: parseInt(appContext.query.id, 10),
      seasonNumber: parseInt(appContext.query.season, 10),
      episodeNumber: parseInt(appContext.query.episode, 10),
    };
    await appContext.reduxStore.dispatch(getConfiguration());
    await appContext.reduxStore.dispatch(getCurrent(props.tvId));
    return props;
  }

  static getDerivedStateFromProps({ episode = {} }, state) {
    if (state.id === episode.id) {
      return state;
    }

    const files = getStreamableFiles(episode);
    if (files.length <= 0) {
      return { ...defaultState, id: episode.id };
    }

    return {
      sources: createSources(files[0]),
      tracks: createTracks(files[0]),
    };
  }

  onUpload = () =>
    this.props.openUploadModal({ api: this.props.api }, success => {
      if (success === true) {
        Router.push('/in');
      }
    });

  onChangeMetadata = file => {
    this.props.openMetadataModal({
      file,
    });
  };

  gotoNextEpisode = () => {
    const {
      tv: {
        data: { seasons },
      },
      tvId,
      episode,
    } = this.props;

    const next = findEpisode(
      seasons,
      (current, previous) => previous && previous.episode.id === episode.id,
    );

    if (!next) {
      return;
    }

    Router.push(
      '/in/tv/[id]/[season]/[episode]',
      `/in/tv/${tvId}/${next.season.seasonNumber}/${next.episode.episodeNumber}`,
      { scroll: false },
    );
  };

  render() {
    const {
      tv: { loading, data: tv = {}, error },
      season,
      episode,
      configuration,
      token,
      tvId,
    } = this.props;

    if (loading) {
      return <WaveLoader fill="page" visible />;
    }

    if (error) {
      return <ErrorPage {...error} />;
    }

    if (!episode || !season) {
      return (
        <ErrorPage
          message="Episode or season missing"
          status="404"
          title="Not found"
        />
      );
    }

    const isSiteAdmin = hasRole(token.roles, ROLE_ADMIN);
    const isUploader = hasRole(token.roles, ROLE_UPLOADER);
    const files = episode.files || [];
    const streamableFiles = getStreamableFiles(episode);
    const seasonEpisode = getEpisodeNumberLabel(
      season.seasonNumber,
      episode.episodeNumber,
    );
    const isStreamable = streamableFiles.length > 0;
    const hasFiles = files.length > 0;

    return (
      <MetadataContainer>
        {({ remove, removeMetadata: onRemoveMetadata }) => (
          <>
            <BackdropImage
              className="mb-5"
              path={tv.backdropPath}
              configuration={configuration}
              type="backdrop"
              size={2}
            >
              <Page>
                <div className="mb-4">
                  <Link
                    passHref
                    prefetch={false}
                    href="/in/tv/[id]"
                    as={`/in/tv/${tv.id}`}
                  >
                    <a className="align-items-center d-flex text-muted">
                      <ChevronLeft />
                      {tv.name}
                    </a>
                  </Link>
                  <h1 className="mb-0">
                    {episode.name}
                    {` `}
                    <span className="text-muted">({seasonEpisode})</span>
                  </h1>
                </div>
                <div className="row">
                  <div className="col-md-8 mb-3 mb-md-0">
                    <div
                      className={cl(
                        styles.episodePlayerContainer,
                        'border-radius',
                      )}
                    >
                      {isStreamable && (
                        <Player
                          {...this.state}
                          title={`${episode.name} - ${seasonEpisode}`}
                          videoClassName={styles.episodePlayer}
                          onGenericDetected={this.gotoNextEpisode}
                          onEnded={this.gotoNextEpisode}
                        />
                      )}
                      {!isStreamable && hasFiles && (
                        <div
                          className={cl(
                            styles.episodePlayer,
                            'd-flex align-items-center justify-content-center flex-column',
                          )}
                        >
                          This file is not available for streaming, but you can
                          download it.
                          <br />
                          <a
                            href={files[0].url}
                            target="_blank"
                            className="mt-3 btn btn-primary"
                          >
                            <Download className="mr-2" />
                            Download
                          </a>
                        </div>
                      )}
                      {!isStreamable && !hasFiles && (
                        <div
                          className={cl(
                            styles.episodePlayer,
                            'd-flex align-items-center justify-content-center flex-column',
                          )}
                        >
                          This episode is not yet available on totodl
                          {isUploader ? `, but you can upload it now` : ''}
                          {isUploader && (
                            <button
                              type="button"
                              onClick={this.onUpload}
                              className="mt-3 btn btn-primary"
                            >
                              <UploadCloud className="mr-2" />
                              Upload
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <Playlist
                      className={cl(styles.episodePlaylist, 'scrollbar-white')}
                    >
                      {tv.seasons.map(({ episodes, ...s }) =>
                        episodes.map(e => (
                          <Link
                            passHref
                            scroll={false}
                            prefetch={false}
                            href="/in/tv/[id]/[season]/[episode]"
                            as={`/in/tv/${tvId}/${s.seasonNumber}/${e.episodeNumber}`}
                            key={e.id}
                          >
                            <PlaylistItem
                              as="a"
                              active={e.id === episode.id}
                              hoverable
                              disabled={e.files.length <= 0}
                            >
                              <span className="text-muted">
                                {getEpisodeNumberLabel(
                                  s.seasonNumber,
                                  e.episodeNumber,
                                )}
                              </span>{' '}
                              - {e.name}
                            </PlaylistItem>
                          </Link>
                        )),
                      )}
                    </Playlist>
                  </div>
                </div>
              </Page>
            </BackdropImage>
            <Page>
              {files.length > 0 && (
                <TranscoderContainer>
                  {({ transcode, loading: transcodeLoading }) => (
                    <div className="mb-5">
                      <h3 className="mb-0">Files</h3>
                      {files.map(file => (
                        <File
                          file={file}
                          key={file.id}
                          hideInfo={file.tvId === tvId}
                          onRemoveMetadata={
                            isSiteAdmin || token.id === file.userId
                              ? onRemoveMetadata
                              : undefined
                          }
                          onChangeMetadata={
                            isSiteAdmin || token.id === file.userId
                              ? this.onChangeMetadata
                              : undefined
                          }
                          onTranscode={isSiteAdmin ? transcode : undefined}
                        />
                      ))}
                      <WaveLoader
                        fill="page"
                        visible={remove.loading || transcodeLoading}
                      />
                    </div>
                  )}
                </TranscoderContainer>
              )}
              {episode.guestStars.length > 0 && (
                <>
                  <h3>Guest stars</h3>
                  <div className="overflow-auto w-100 mb-5 scrollbar-dark">
                    <div className="d-flex flex-row flex-nowrap row">
                      {episode.guestStars.map(({ character, id, person }) => (
                        <div
                          className="mb-3 col-xl-2 col-lg-3 col-md-4 col-6 flex-grow-1 flex-shrink-0"
                          key={id}
                        >
                          <Actor
                            className="h-100"
                            character={character}
                            configuration={configuration}
                            person={person}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </Page>
          </>
        )}
      </MetadataContainer>
    );
  }
}

export default compose(
  withRedirectTo(redirectUnlogged),
  withToken(),
  withApi(),
  connect((state, { episodeNumber, seasonNumber }) => {
    const tv = get(state, 'tv.current', {});
    const season = get(tv, 'data.seasons', []).find(
      s => s.seasonNumber === seasonNumber,
    );
    const episode = get(season, 'episodes', []).find(
      e => e.episodeNumber === episodeNumber,
    );
    return {
      configuration: get(state, 'metadataConfiguration', {}),
      tv,
      episode,
      season,
    };
  }),
  connectModals({ PlayerModal, MetadataModal, UploadModal }),
  withUserPreloading,
)(TvEpisode);
