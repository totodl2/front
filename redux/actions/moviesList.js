import get from 'lodash/get';

import createRandom from '../../lib/createRandom';
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
    console.warn(e);
    if (e.response) {
      const data = get(e, 'response.data', {});
      dispatch(
        setListError({
          status: data.code || e.status,
          title: data.name || e.statusText,
          message: data.message,
        }),
      );
    } else {
      dispatch(setListError(e));
    }
    return null;
  } finally {
    dispatch(stopLoading(loadingKey));
  }
};
