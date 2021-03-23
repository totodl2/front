import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Play } from 'react-feather';

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

class Movie extends PureComponent {
  static propTypes = {
    configuration: PropTypes.object.isRequired,
    openPlayerModal: PropTypes.func.isRequired,
    movie: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.object,
      error: PropTypes.object,
    }),
  };

  static async getInitialProps(appContext) {
    await appContext.reduxStore.dispatch(getConfiguration());
    await appContext.reduxStore.dispatch(getCurrent(appContext.query.id));
    return {};
  }

  onPlay = file => {
    this.props.openPlayerModal({
      sources: createSources(file),
      tracks: createTracks(file),
      title: this.props.movie.data.title,
    });
  };

  render() {
    const {
      movie: { data = {}, error },
      configuration,
    } = this.props;

    if (error) {
      return <ErrorPage {...error} />;
    }

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
      <div>
        <BackdropImage
          path={data.backdropPath}
          configuration={configuration}
          type="backdrop"
          size={2}
        >
          <Page>
            <div className="mb-4">
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
              <div className="col-md-3">
                <ImdbImage
                  path={data.posterPath}
                  alt={data.title}
                  configuration={configuration}
                  type="poster"
                  size={4}
                  className="w-100 border-radius"
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
                          className="btn btn-outline-white btn-sm mr-2"
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
              </div>
            </div>
          </Page>
        </BackdropImage>
        <Page>
          {files.length > 0 && (
            <div className="my-5">
              <h3 className="mb-0">Files</h3>
              {files.map(file => (
                <File file={file} key={file.id} onPlay={this.onPlay} hideInfo />
              ))}
            </div>
          )}
          {cast.length > 0 && (
            <>
              <h3>Actors</h3>
              <div className="row mb-5">
                {cast.map(({ character, id, person }) => (
                  <div className="col-md-2 mb-3" key={id}>
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
      </div>
    );
  }
}

export default compose(
  withRedirectTo(redirectUnlogged),
  connect(
    state => ({
      configuration: get(state, 'metadataConfiguration', {}),
      movie: get(state, 'movies.current', {}),
    }),
    // dispatch =>
    //   bindActionCreators(
    //     { getTorrent, getMe, remove, pause, start, searchTorrent: search },
    //     dispatch,
    //   ),
  ),
  connectModals({ PlayerModal }),
)(Movie);
