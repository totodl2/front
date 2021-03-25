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
    set: {
      fileId: null,
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

  set = async (fileId, movieId) => {
    const { api } = this.props;
    try {
      this.setState({ set: { fileId, loading: true, error: null } });
      await api.metadata.set({
        routeParams: { file: fileId },
        data: { movieId },
      });
    } catch (e) {
      this.setState(({ set }) => ({
        set: { ...set, error: handleApiError(e) },
      }));
    } finally {
      this.setState(({ set }) => ({
        set: { ...set, loading: false },
      }));
    }
  };

  render() {
    const { view: View, api, ...props } = this.props;
    const { search, remove, set } = this.state;
    const newProps = {
      search,
      remove,
      set,
      removeMetadata: this.remove,
      setMetadata: this.set,
      searchMovie: this.searchMovie,
    };

    return View ? (
      <View {...props} {...newProps} />
    ) : (
      this.props.children(newProps)
    );
  }
}

export default withApi()(MetadataContainer);
