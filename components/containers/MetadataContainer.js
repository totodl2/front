import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withApi from '../../lib/api/withApi';
import handleApiError from '../../lib/utils/handleApiError';

class MetadataContainer extends PureComponent {
  static propTypes = {
    view: PropTypes.any,
    children: PropTypes.func,
    api: PropTypes.object.isRequired,
  };

  state = {
    search: {
      loading: false,
      error: null,
      results: null,
    },
    remove: {
      fileId: null,
      loading: false,
      error: null,
    },
    movie: {
      fileId: null,
      loading: false,
      error: null,
    },
    tv: {
      files: [],
      loading: false,
      error: null,
    },
  };

  remove = async fileId => {
    const { api } = this.props;
    try {
      this.setState({ remove: { fileId, loading: true, error: null } });
      await api.metadata.remove({
        routeParams: { file: fileId },
      });
    } catch (e) {
      this.setState(({ remove }) => ({
        remove: { ...remove, error: handleApiError(e) },
      }));
    } finally {
      this.setState(({ remove }) => ({
        remove: { ...remove, loading: false },
      }));
    }
  };

  searchMovie = async query => {
    const { api } = this.props;
    try {
      this.setState({ search: { loading: true, error: null, results: null } });
      const results = (await api.metadata.searchMovie({ params: { query } }))
        .data;
      this.setState(({ search }) => ({ search: { ...search, results } }));
    } catch (e) {
      this.setState(({ search }) => ({
        search: { ...search, error: handleApiError(e) },
      }));
    } finally {
      this.setState(({ search }) => ({
        search: { ...search, loading: false },
      }));
    }
  };

  searchTv = async query => {
    const { api } = this.props;
    try {
      this.setState({ search: { loading: true, error: null, results: null } });
      const results = (await api.metadata.searchTv({ params: { query } })).data;
      this.setState(({ search }) => ({ search: { ...search, results } }));
    } catch (e) {
      this.setState(({ search }) => ({
        search: { ...search, error: handleApiError(e) },
      }));
    } finally {
      this.setState(({ search }) => ({
        search: { ...search, loading: false },
      }));
    }
  };

  setMovie = async (fileId, movieId) => {
    const { api } = this.props;
    try {
      this.setState({ movie: { fileId, loading: true, error: null } });
      await api.metadata.setMovie({
        routeParams: { file: fileId },
        data: { movieId },
      });
    } catch (e) {
      this.setState(({ movie }) => ({
        movie: { ...movie, error: handleApiError(e) },
      }));
    } finally {
      this.setState(({ movie }) => ({
        movie: { ...movie, loading: false },
      }));
    }
  };

  setTv = async (files, tvId) => {
    const { api } = this.props;
    try {
      this.setState({ tv: { files, loading: true, error: null } });
      await api.metadata.setTv({
        routeParams: { tvId },
        data: files,
      });
    } catch (e) {
      this.setState(({ tv }) => ({
        tv: { ...tv, error: handleApiError(e) },
      }));
    } finally {
      this.setState(({ tv }) => ({
        tv: { ...tv, loading: false },
      }));
    }
  };

  render() {
    const { view: View, api, ...props } = this.props;
    const { search, remove, movie, tv } = this.state;
    const newProps = {
      search,
      remove,
      movie,
      tv,
      removeMetadata: this.remove,
      setMovieMetadata: this.setMovie,
      searchMovie: this.searchMovie,
      searchTv: this.searchTv,
      setTvMetadata: this.setTv,
    };

    return View ? (
      <View {...props} {...newProps} />
    ) : (
      this.props.children(newProps)
    );
  }
}

export default withApi()(MetadataContainer);
