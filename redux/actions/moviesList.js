import createRandom from '../../lib/createRandom';
import handleApiError from '../../lib/utils/handleApiError';
export const TYPE_SET_LIST = 'movies/list/set';
export const TYPE_START_LOADING_LIST = 'movies/list/startLoading';
export const TYPE_STOP_LOADING_LIST = 'movies/list/stopLoading';
export const TYPE_SET_LIST_ERROR = 'movies/list/error';

const startLoading = loadingKey => ({
  loadingKey,
  type: TYPE_START_LOADING_LIST,
});

const stopLoading = loadingKey => ({
  loadingKey,
  type: TYPE_STOP_LOADING_LIST,
});

export const setData = data => ({
  type: TYPE_SET_LIST,
  data,
});

export const setListError = error => ({
  type: TYPE_SET_LIST_ERROR,
  error,
});

export const getList = genreId => async (dispatch, getState, api) => {
  const loadingKey = createRandom(12);
  dispatch(startLoading(loadingKey));
  try {
    const { data } = await api.movies[genreId ? 'getByGenre' : 'getTop']({
      routeParams: genreId ? { genre: genreId } : {},
    });
    dispatch(setData(data));
    return data;
  } catch (e) {
    dispatch(setListError(handleApiError(e)));
    return null;
  } finally {
    dispatch(stopLoading(loadingKey));
  }
};
