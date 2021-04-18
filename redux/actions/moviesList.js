import get from 'lodash/get';
import createRandom from '../../lib/createRandom';
import handleApiError from '../../lib/utils/handleApiError';
export const TYPE_SET_LIST = 'movies/list/set';
export const TYPE_START_LOADING_LIST = 'movies/list/startLoading';
export const TYPE_STOP_LOADING_LIST = 'movies/list/stopLoading';
export const TYPE_SET_LIST_ERROR = 'movies/list/error';

const startLoading = (genreId, from, loadingKey) => ({
  loadingKey,
  genreId,
  type: TYPE_START_LOADING_LIST,
});

const stopLoading = loadingKey => ({
  loadingKey,
  type: TYPE_STOP_LOADING_LIST,
});

export const setData = (genreId, from, data) => ({
  type: TYPE_SET_LIST,
  data,
  from,
  genreId,
});

export const setListError = error => ({
  type: TYPE_SET_LIST_ERROR,
  error,
});

export const getList = ({ genreId = null, from = 0, forceReload }) => async (
  dispatch,
  getState,
  api,
) => {
  const state = getState();
  const currentGenreId = get(getState(), 'movies.list.genreId');
  const lastFrom = get(getState(), 'movies.list.from');
  if (currentGenreId === genreId && !forceReload && from === lastFrom) {
    return {
      data: get(state, 'movies.list.data'),
      watchStatus: get(state, 'movies.list.watchStatus'),
      genres: get(state, 'movies.list.genres'),
    };
  }

  const loadingKey = createRandom(12);
  dispatch(startLoading(genreId, loadingKey));
  try {
    const { data } = await api.movies[genreId ? 'getByGenre' : 'getAll']({
      routeParams: { genre: genreId },
      params: { from },
    });
    dispatch(setData(genreId, from, data));
    return data;
  } catch (e) {
    dispatch(setListError(handleApiError(e)));
    return null;
  } finally {
    dispatch(stopLoading(loadingKey));
  }
};
