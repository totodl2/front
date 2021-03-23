import get from 'lodash/get';

import createRandom from '../../lib/createRandom';
export const TYPE_SET_CURRENT = 'movies/current/set';
export const TYPE_START_LOADING_CURRENT = 'movies/current/startLoading';
export const TYPE_STOP_LOADING_CURRENT = 'movies/current/stopLoading';
export const TYPE_SET_CURRENT_ERROR = 'movies/current/error';

const startLoadingCurrent = loadingKey => ({
  loadingKey,
  type: TYPE_START_LOADING_CURRENT,
});

const stopLoadingCurrent = loadingKey => ({
  loadingKey,
  type: TYPE_STOP_LOADING_CURRENT,
});

export const setCurrent = data => ({
  type: TYPE_SET_CURRENT,
  data,
});

export const setCurrentError = error => ({
  type: TYPE_SET_CURRENT_ERROR,
  error,
});

export const getCurrent = id => async (dispatch, getState, api) => {
  const loadingKey = createRandom(12);
  dispatch(startLoadingCurrent(loadingKey));
  try {
    const { data } = await api.movies.get({ routeParams: { movie: id } });
    dispatch(setCurrent(data));
    return data;
  } catch (e) {
    console.warn(e);
    if (e.response) {
      const data = get(e, 'response.data', {});
      dispatch(
        setCurrentError({
          status: data.code || e.status,
          title: data.name || e.statusText,
          message: data.message,
        }),
      );
    } else {
      dispatch(setCurrentError(e));
    }
    return null;
  } finally {
    dispatch(stopLoadingCurrent(loadingKey));
  }
};
