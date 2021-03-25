import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';

import MovieCard from '../../../components/presentationals/movie';
import { getConfiguration } from '../../../redux/actions/metadataConfiguration';
import { getList as getListAction } from '../../../redux/actions/moviesList';
import compose from '../../../lib/compose';
import withRedirectTo from '../../../lib/withRedirectTo';
import redirectUnlogged from '../../../lib/redirection/redirectUnlogged';
import ErrorPage from '../../../components/site/error';
import Page from '../../../components/layouts/page';
import withUserPreloading from '../../../lib/user/withUserPreloading';
import Loader from '../../../components/presentationals/loader';

class Movie extends PureComponent {
  static propTypes = {
    configuration: PropTypes.object.isRequired,
    router: PropTypes.shape({
      query: PropTypes.object,
    }).isRequired,
    getMoviesList: PropTypes.func.isRequired,
    genreId: PropTypes.number,
    list: PropTypes.shape({
      loading: PropTypes.bool,
      hasMore: PropTypes.bool,
      genreId: PropTypes.number,
      genres: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
      ),
      data: PropTypes.arrayOf(
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
      error: PropTypes.object,
    }),
  };

  static async getInitialProps(appContext) {
    let genreId = get(appContext, 'query.id');
    genreId = genreId !== undefined ? parseInt(genreId, 10) : genreId;
    await appContext.reduxStore.dispatch(getConfiguration());
    await appContext.reduxStore.dispatch(getListAction({ genreId }));
    return { genreId };
  }

  loadMore = () => {
    const {
      genreId,
      list: { data, loading, hasMore },
      getMoviesList,
    } = this.props;
    if (loading || !hasMore) {
      return;
    }
    getMoviesList({ genreId, from: data.length });
  };

  render() {
    const {
      list: { data, genres, error, loading, hasMore },
      router: { query },
      configuration,
    } = this.props;

    if (error) {
      return <ErrorPage {...error} />;
    }

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
        {data.length > 0 && (
          <InfiniteScroll
            pageStart={0}
            initialLoad={false}
            hasMore={hasMore}
            loadMore={this.loadMore}
          >
            <div className="mb-4">
              <h2>Last added</h2>
              <div className="row">
                {data.map(movie => (
                  <div
                    className="col-xl-2 col-lg-3 col-md-4 col-6 mb-3"
                    key={movie.id}
                  >
                    <Link
                      passHref
                      href="/in/movies/[id]"
                      as={`/in/movies/${encodeURIComponent(
                        movie.id.toString(),
                      )}`}
                    >
                      <MovieCard
                        view="a"
                        configuration={configuration}
                        title={movie.title}
                        posterPath={movie.posterPath}
                        releaseDate={movie.releaseDate}
                        hoverable
                      />
                    </Link>
                  </div>
                ))}
                {loading && (
                  <div className="d-flex justify-content-center mt-3 w-100">
                    <Loader visible fill="none" />
                  </div>
                )}
              </div>
            </div>
          </InfiniteScroll>
        )}
      </Page>
    );
  }
}

export default compose(
  withRouter,
  withRedirectTo(redirectUnlogged),
  connect(
    state => ({
      configuration: get(state, 'metadataConfiguration', {}),
      list: get(state, 'movies.list', {}),
    }),
    dispatch => bindActionCreators({ getMoviesList: getListAction }, dispatch),
  ),
  withUserPreloading,
)(Movie);
