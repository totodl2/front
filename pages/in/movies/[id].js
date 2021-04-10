import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Link from 'next/link';
import { ReactComponent as Play } from 'feather-icons/dist/icons/play.svg';
import { ReactComponent as Download } from 'feather-icons/dist/icons/download.svg';
import { ReactComponent as ChevronLeft } from 'feather-icons/dist/icons/chevron-left.svg';

import { getConfiguration } from '../../../redux/actions/metadataConfiguration';
import { getCurrent } from '../../../redux/actions/moviesCurrent';
import compose from '../../../lib/compose';
import withRedirectTo from '../../../lib/withRedirectTo';
import redirectUnlogged from '../../../lib/redirection/redirectUnlogged';
import ImdbImage from '../../../components/presentationals/imdbImage';
import BackdropImage from '../../../components/presentationals/backdropImage';
import Page from '../../../components/layouts/page';
import File from '../../../components/presentationals/torrentCard/files/file';
import connectModals from '../../../lib/connectModals';
import PlayerModal from '../../../components/modals/Player';
import createSources from '../../../lib/file/createSources';
import createTracks from '../../../lib/file/createTracks';
import Actor from '../../../components/presentationals/actor';
import ErrorPage from '../../../components/site/error';
import WaveLoader from '../../../components/presentationals/waveLoader';
import withUserPreloading from '../../../lib/user/withUserPreloading';
import { hasRole, ROLE_ADMIN } from '../../../lib/roles';
import withToken from '../../../lib/token/withToken';
import Token from '../../../lib/token/token';
import MetadataModal from '../../../components/modals/Metadata';
import MetadataContainer from '../../../components/containers/MetadataContainer';
import TranscoderContainer from '../../../components/containers/TranscoderContainer';

class Movie extends PureComponent {
  static propTypes = {
    movieId: PropTypes.number.isRequired,
    configuration: PropTypes.object.isRequired,
    openPlayerModal: PropTypes.func.isRequired,
    movie: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.object,
      error: PropTypes.object,
    }),
    token: PropTypes.instanceOf(Token),
    openMetadataModal: PropTypes.func.isRequired,
  };

  static async getInitialProps(appContext) {
    const props = { movieId: parseInt(appContext.query.id, 10) };
    await appContext.reduxStore.dispatch(getConfiguration());
    await appContext.reduxStore.dispatch(getCurrent(props.movieId));
    return props;
  }

  onPlay = file => {
    this.props.openPlayerModal({
      sources: createSources(file),
      tracks: createTracks(file),
      title: this.props.movie.data.title,
    });
  };

  onChangeMetadata = file => {
    this.props.openMetadataModal({
      file,
    });
  };

  render() {
    const {
      movie: { loading, data = {}, error },
      configuration,
      token,
      movieId,
    } = this.props;

    if (loading) {
      return <WaveLoader fill="page" visible />;
    }

    if (error) {
      return <ErrorPage {...error} />;
    }

    const isSiteAdmin = hasRole(token.roles, ROLE_ADMIN);
    const releaseDate = data.releaseDate && new Date(data.releaseDate);
    const trailers = data.videos.filter(
      video =>
        video.type === 'TRAILER' && video.site.toLowerCase() === 'youtube',
    );
    const files = data.files || [];
    const streamableFiles = files.filter(
      file =>
        (file.transcoded || []).filter(f => f.type === 'media').length > 0,
    );

    const cast = get(data, 'credits.cast', []).slice(0, 12);

    return (
      <MetadataContainer>
        {({ remove, removeMetadata: onRemoveMetadata }) => (
          <>
            <BackdropImage
              className="mb-5"
              path={data.backdropPath}
              configuration={configuration}
              type="backdrop"
              size={2}
            >
              <Page>
                <div className="mb-4">
                  <Link href="/in/movies">
                    <a className="align-items-center d-flex text-muted">
                      <ChevronLeft />
                      All genres
                    </a>
                  </Link>
                  <h1 className="mb-0">
                    {data.title}
                    {` `}
                    {releaseDate && (
                      <span className="text-muted">
                        ({releaseDate.getFullYear()})
                      </span>
                    )}
                  </h1>
                  <h6 className="mb-0">{data.originalTitle}</h6>
                </div>
                <div className="row">
                  <div className="col-md-3 text-center mb-3 mb-md-0">
                    <ImdbImage
                      path={data.posterPath}
                      alt={data.title}
                      configuration={configuration}
                      type="poster"
                      size={4}
                      className="w-100 border-radius"
                      style={{ maxWidth: '300px' }}
                    />
                  </div>
                  <div className="col-md-8">
                    {data.genres && data.genres.length > 0 && (
                      <>
                        <h6 className="mb-0">Genres</h6>
                        <p>
                          {data.genres.map((genre, i) => (
                            <span key={genre.id}>
                              <span>{genre.name}</span>
                              {i + 1 < data.genres.length ? ', ' : ''}
                            </span>
                          ))}
                        </p>
                      </>
                    )}
                    {data.productionCountries &&
                      data.productionCountries.length > 0 && (
                        <>
                          <h6 className="mb-0">Country</h6>
                          <p>
                            {data.productionCountries.map((country, i) => (
                              <span key={country.iso31661}>
                                <span>{country.name}</span>
                                {i + 1 < data.productionCountries.length
                                  ? ', '
                                  : ''}
                              </span>
                            ))}
                          </p>
                        </>
                      )}
                    {data.overview && (
                      <>
                        <h6 className="mb-0">Overview</h6>
                        <p>{data.overview}</p>
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
                    {streamableFiles.length > 0 && (
                      <button
                        type="button"
                        onClick={() => this.onPlay(streamableFiles[0])}
                        className="mt-3 btn btn-primary"
                      >
                        <Play className="mr-2" />
                        Watch
                      </button>
                    )}
                    {streamableFiles.length <= 0 && files.length > 0 && (
                      <a
                        href={files[0].url}
                        target="_blank"
                        className="mt-3 btn btn-primary"
                      >
                        <Download className="mr-2" />
                        Download
                      </a>
                    )}
                  </div>
                </div>
              </Page>
            </BackdropImage>
            <Page>
              {files.length > 0 && (
                <TranscoderContainer>
                  {({ transcode, loading: transcodeLoading }) => (
                    <div className="mb-5">
                      <h3 className="mb-0" id="files">
                        Files
                      </h3>
                      {files.map(file => (
                        <File
                          file={file}
                          key={file.id}
                          onPlay={this.onPlay}
                          hideInfo={file.movieId === movieId}
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
              {cast.length > 0 && (
                <>
                  <h3>Actors</h3>
                  <div className="row mb-5">
                    {cast.map(({ character, id, person }) => (
                      <div
                        className="col-xl-2 col-lg-3 col-md-4 col-6 mb-3"
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
  connect(state => ({
    configuration: get(state, 'metadataConfiguration', {}),
    movie: get(state, 'movies.current', {}),
  })),
  connectModals({ PlayerModal, MetadataModal }),
  withUserPreloading,
)(Movie);
