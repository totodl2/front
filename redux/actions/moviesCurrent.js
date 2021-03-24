import createRandom from '../../lib/createRandom';
import handleApiError from '../../lib/utils/handleApiError';
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
    dispatch(setCurrentError(handleApiError(e)));
    return null;
  } finally {
    dispatch(stopLoadingCurrent(loadingKey));
  }
};
