import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Link from 'next/link';
import { withRouter } from 'next/router';

import MovieCard from '../../../components/presentationals/movie';
import { getConfiguration } from '../../../redux/actions/metadataConfiguration';
import { getList } from '../../../redux/actions/moviesList';
import compose from '../../../lib/compose';
import withRedirectTo from '../../../lib/withRedirectTo';
import redirectUnlogged from '../../../lib/redirection/redirectUnlogged';
import ErrorPage from '../../../components/site/error';
import Page from '../../../components/layouts/page';
import WaveLoader from '../../../components/presentationals/waveLoader';

const getTypeTitle = (genres, type) => {
  if (type === 'last') {
    return 'Last added';
  }

  for (let i = 0, sz = genres.length; i < sz; i++) {
    if (genres[i].id === type) {
      return genres[i].name;
    }
  }

  return 'Unknown genre';
};

class Movie extends PureComponent {
  static propTypes = {
    configuration: PropTypes.object.isRequired,
    router: PropTypes.shape({
      query: PropTypes.object,
    }).isRequired,
    list: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.shape({
        genres: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          }),
        ),
        movies: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            data: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.number,
                backdropPath: PropTypes.string,
                originalTitle: PropTypes.string,
                popularity: PropTypes.number,
                posterPath: PropTypes.string,
                title: PropTypes.string,
              }),
            ),
          }),
        ),
      }),
      error: PropTypes.object,
    }),
  };

  static async getInitialProps(appContext) {
    await appContext.reduxStore.dispatch(getConfiguration());
    await appContext.reduxStore.dispatch(getList(get(appContext, 'query.id')));
    return {};
  }

  render() {
    const {
      list: { data, error, loading },
      router: { query },
      configuration,
    } = this.props;

    if (loading) {
      return <WaveLoader fill="page" visible />;
    }

    if (error) {
      return <ErrorPage {...error} />;
    }

    const { genres, movies } = data;
    const currentGenreId = query.id ? parseInt(query.id, 10) : null;

    return (
      <Page>
        <div className="mt-5 mb-4">
          <h2>Genres</h2>
          <Link href="/in/movies">
            <a
              className={cl('btn btn-sm mb-2 mr-2', {
                'btn-outline-dark': currentGenreId !== null,
                'btn-dark': currentGenreId === null,
              })}
            >
              All genres
            </a>
          </Link>
          {genres.map(genre => (
            <Link
              href="/in/movies/genres/[id]"
              as={`/in/movies/genres/${genre.id}`}
              key={genre.id}
            >
              <a
                className={cl('btn btn-sm mb-2 mr-2', {
                  'btn-outline-dark': currentGenreId !== genre.id,
                  'btn-dark': currentGenreId === genre.id,
                })}
              >
                {genre.name}
              </a>
            </Link>
          ))}
        </div>
        {movies.map(({ type, data: moviesList }) => (
          <div key={type} className="mb-4">
            <h2>{getTypeTitle(genres, type)}</h2>
            <div className="row">
              {moviesList.map(movie => (
                <div
                  className="col-xl-2 col-lg-3 col-md-4 col-6 mb-3"
                  key={movie.id}
                >
                  <Link
                    passHref
                    href="/in/movies/[id]"
                    as={`/in/movies/${encodeURIComponent(movie.id.toString())}`}
                  >
                    <MovieCard
                      view="a"
                      configuration={configuration}
                      title={movie.title}
                      posterPath={movie.posterPath}
                      hoverable
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Page>
    );
  }
}

export default compose(
  withRouter,
  withRedirectTo(redirectUnlogged),
  connect(state => ({
    configuration: get(state, 'metadataConfiguration', {}),
    list: get(state, 'movies.list', {}),
  })),
)(Movie);
