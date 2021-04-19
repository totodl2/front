import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cl from 'classnames';
import get from 'lodash/get';
import Router from 'next/router';
import Link from 'next/link';
import { ReactComponent as Play } from 'feather-icons/dist/icons/play.svg';
import { ReactComponent as UploadCloud } from 'feather-icons/dist/icons/upload-cloud.svg';
import { ReactComponent as ChevronLeft } from 'feather-icons/dist/icons/chevron-left.svg';

import { getConfiguration } from '../../../../redux/actions/metadataConfiguration';
import { getCurrent } from '../../../../redux/actions/tvCurrent';
import compose from '../../../../lib/compose';
import withRedirectTo from '../../../../lib/withRedirectTo';
import redirectUnlogged from '../../../../lib/redirection/redirectUnlogged';
import ImdbImage from '../../../../components/presentationals/imdbImage';
import BackdropImage from '../../../../components/presentationals/backdropImage';
import Page from '../../../../components/layouts/page';
import File from '../../../../components/presentationals/torrentCard/files/file';
import connectModals from '../../../../lib/connectModals';
import PlayerModal from '../../../../components/modals/Player';
import Actor from '../../../../components/presentationals/actor';
import ErrorPage from '../../../../components/site/error';
import WaveLoader from '../../../../components/presentationals/waveLoader';
import withUserPreloading from '../../../../lib/user/withUserPreloading';
import { hasRole, ROLE_ADMIN, ROLE_UPLOADER } from '../../../../lib/roles';
import withToken from '../../../../lib/token/withToken';
import Token from '../../../../lib/token/token';
import MovieMetadataModal from '../../../../components/modals/Metadata/movie';
import MetadataContainer from '../../../../components/containers/MetadataContainer';
import TranscoderContainer from '../../../../components/containers/TranscoderContainer';
import ImdbCard from '../../../../components/presentationals/imdbCard';
import UploadModal from '../../../../components/modals/Upload';
import withApi from '../../../../lib/api/withApi';
import findEpisode from '../../../../lib/episode/findEpisode';
import getEpisodeNumberLabel from '../../../../lib/episode/getEpisodeNumberLabel';

import styles from './tv.module.scss';
import TvMetadataModal from '../../../../components/modals/Metadata/tv';
import findLastFullyWatched from '../../../../lib/watchStatus/findLastFullyWatched';
import isAllWatched from '../../../../lib/watchStatus/isAllWatched';

class Tv extends PureComponent {
  static propTypes = {
    tvId: PropTypes.number.isRequired,
    configuration: PropTypes.object.isRequired,
    openPlayerModal: PropTypes.func.isRequired,
    tv: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.object,
      error: PropTypes.object,
    }),
    token: PropTypes.instanceOf(Token),
    openMovieMetadataModal: PropTypes.func.isRequired,
    openTvMetadataModal: PropTypes.func.isRequired,
    openUploadModal: PropTypes.func.isRequired,
    api: PropTypes.object,
  };

  static async getInitialProps(appContext) {
    const props = { tvId: parseInt(appContext.query.id, 10) };
    await appContext.reduxStore.dispatch(getConfiguration());
    await appContext.reduxStore.dispatch(getCurrent(props.tvId));
    return props;
  }

  onUpload = () =>
    this.props.openUploadModal({ api: this.props.api }, success => {
      if (success === true) {
        Router.push('/in');
      }
    });

  onPlay = file => {
    this.props.openPlayerModal({
      file,
      title: this.props.tv.data.name,
    });
  };

  onChangeMovieMetadata = file => {
    this.props.openMovieMetadataModal({ file });
  };

  onChangeTvMetadata = files => {
    this.props.openTvMetadataModal({ files });
  };

  findWatchStatus = (tvId, seasonNumber, episodeNumber) => {
    const {
      tv: { data: { watchStatus } = {} },
    } = this.props;
    return watchStatus.find(
      status =>
        status.tvId === tvId &&
        status.seasonNumber === seasonNumber &&
        status.episodeNumber === episodeNumber,
    );
  };

  getNextEpisodeToWatch = () => {
    const {
      tv: { data: { seasons, watchStatus } = {} },
    } = this.props;
    const lastSeen = findLastFullyWatched(watchStatus);

    if (!lastSeen) {
      return findEpisode(
        seasons,
        ({ episode }) => episode.files && episode.files.length > 0,
      );
    }

    if (!isAllWatched(lastSeen)) {
      return findEpisode(
        seasons,
        ({ episode, season }) =>
          episode.episodeNumber === lastSeen.episodeNumber &&
          season.seasonNumber === lastSeen.seasonNumber,
      );
    }

    return findEpisode(
      seasons,
      (currentEpisode, previous) =>
        previous &&
        previous.episode.episodeNumber === lastSeen.episodeNumber &&
        previous.season.seasonNumber === lastSeen.seasonNumber,
    );
  };

  render() {
    const {
      tv: { loading, data: tv = {}, error },
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

    const isSiteAdmin = hasRole(token.roles, ROLE_ADMIN);
    const isUploader = hasRole(token.roles, ROLE_UPLOADER);
    const trailers = tv.videos.filter(
      video =>
        video.type === 'TRAILER' && video.site.toLowerCase() === 'youtube',
    );
    const firstAirDate = tv.firstAirDate && new Date(tv.firstAirDate);
    const nextEpisodeToWatch = this.getNextEpisodeToWatch();

    const cast = get(tv, 'credits.cast', []).slice(0, 12);

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
                  <Link href="/in/tv">
                    <a className="align-items-center d-flex text-muted">
                      <ChevronLeft />
                      All genres
                    </a>
                  </Link>
                  <h1 className="mb-0">
                    {tv.name}
                    {` `}
                    {firstAirDate && (
                      <span className="text-muted">
                        ({firstAirDate.getFullYear()})
                      </span>
                    )}
                  </h1>
                  <h6 className="mb-0">{tv.originalName}</h6>
                </div>
                <div className="row">
                  <div className="col-md-3 text-center mb-3 mb-md-0">
                    <ImdbImage
                      path={tv.posterPath}
                      alt={tv.name}
                      configuration={configuration}
                      type="poster"
                      size={4}
                      className="w-100 border-radius"
                      style={{ maxWidth: '300px' }}
                    />
                  </div>
                  <div className="col-md-8">
                    {tv.genres && tv.genres.length > 0 && (
                      <>
                        <h6 className="mb-0">Genres</h6>
                        <p>
                          {tv.genres.map((genre, i) => (
                            <span key={genre.id}>
                              <span>{genre.name}</span>
                              {i + 1 < tv.genres.length ? ', ' : ''}
                            </span>
                          ))}
                        </p>
                      </>
                    )}
                    {tv.overview && (
                      <>
                        <h6 className="mb-0">Overview</h6>
                        <p>{tv.overview}</p>
                      </>
                    )}
                    {trailers && trailers.length > 0 && (
                      <>
                        <h6 className="mb-2">Trailers</h6>
                        <p>
                          {trailers.map(trailer => (
                            <a
                              href={`https://youtu.be/${trailer.key}`}
                              target="_blank"
                              rel="noreferrer noopener"
                              key={trailer.id}
                              className="btn btn-outline-white btn-sm mb-1 mr-2"
                            >
                              {trailer.name}
                            </a>
                          ))}
                        </p>
                      </>
                    )}
                    {nextEpisodeToWatch && (
                      <Link
                        passHref
                        prefetch={false}
                        href="/in/tv/[id]/[season]/[episode]"
                        as={`/in/tv/${tvId}/${nextEpisodeToWatch.season.seasonNumber}/${nextEpisodeToWatch.episode.episodeNumber}`}
                      >
                        <a className="mt-3 btn btn-primary">
                          <Play className="mr-2" />
                          Watch{' '}
                          {getEpisodeNumberLabel(
                            nextEpisodeToWatch.season.seasonNumber,
                            nextEpisodeToWatch.episode.episodeNumber,
                          )}
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </Page>
            </BackdropImage>
            <Page>
              {tv.seasons.map(season => (
                <div key={season.seasonNumber}>
                  <h3 id={`season-${season.seasonNumber}`}>{season.name}</h3>
                  <div className="mb-5 row">
                    {season.episodes.map(episode => {
                      const hasFiles = episode.files.length > 0;
                      const watchStatus = this.findWatchStatus(
                        tv.id,
                        season.seasonNumber,
                        episode.episodeNumber,
                      );
                      return (
                        <div
                          className="mb-3 col-xl-3 col-lg-4 col-6"
                          key={episode.episodeNumber}
                        >
                          {hasFiles ? (
                            <Link
                              passHref
                              prefetch={false}
                              href="/in/tv/[id]/[season]/[episode]"
                              as={`/in/tv/${tvId}/${season.seasonNumber}/${episode.episodeNumber}`}
                            >
                              <ImdbCard
                                view="a"
                                configuration={configuration}
                                stillPath={episode.stillPath}
                                title={`${episode.episodeNumber} - ${episode.name}`}
                                position={watchStatus && watchStatus.position}
                                length={watchStatus && watchStatus.length}
                                hoverable
                              />
                            </Link>
                          ) : (
                            <ImdbCard
                              configuration={configuration}
                              stillPath={episode.stillPath}
                              title={`${episode.episodeNumber} - ${episode.name}`}
                              className={cl(styles.tvCardMissing, {
                                [styles.tvCardMissingHoverable]: isUploader,
                              })}
                              position={watchStatus && watchStatus.position}
                              length={watchStatus && watchStatus.length}
                              onClick={isUploader ? this.onUpload : undefined}
                            >
                              <div className={styles.tvCardMissingContent}>
                                {isUploader ? (
                                  <>
                                    <UploadCloud className="d-block mb-2" />
                                    Upload missing files
                                  </>
                                ) : (
                                  <>Episode not available</>
                                )}
                              </div>
                            </ImdbCard>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {tv.lost && tv.lost.length > 0 && (
                <TranscoderContainer>
                  {({ transcode, loading: transcodeLoading }) => (
                    <div className="mb-5">
                      <h3 className="mb-0">Lost files</h3>
                      {tv.lost.map(file => {
                        const isOwner = isSiteAdmin || token.id === file.userId;
                        return (
                          <File
                            file={file}
                            key={file.id}
                            onPlay={this.onPlay}
                            hideInfo={file.tvId === tvId}
                            onRemoveMetadata={
                              isOwner ? onRemoveMetadata : undefined
                            }
                            onChangeMovieMetadata={
                              isOwner ? this.onChangeMovieMetadata : undefined
                            }
                            onChangeTvMetadata={
                              isOwner ? this.onChangeTvMetadata : undefined
                            }
                            onTranscode={isSiteAdmin ? transcode : undefined}
                          />
                        );
                      })}
                      <WaveLoader
                        fill="page"
                        visible={remove.loading || transcodeLoading}
                      />
                    </div>
                  )}
                </TranscoderContainer>
              )}
              {cast.length > 0 && (
                <>
                  <h3>Actors</h3>
                  <div className="overflow-auto w-100 mb-5 scrollbar-dark">
                    <div className="d-flex flex-row flex-nowrap row">
                      {cast.map(({ character, id, person }) => (
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
  connect(state => ({
    configuration: get(state, 'metadataConfiguration', {}),
    tv: get(state, 'tv.current', {}),
  })),
  connectModals({
    PlayerModal,
    MovieMetadataModal,
    TvMetadataModal,
    UploadModal,
  }),
  withUserPreloading,
)(Tv);
