import get from 'lodash/get';
import createRandom from '../../lib/createRandom';
import handleApiError from '../../lib/utils/handleApiError';
export const TYPE_SET_CURRENT = 'tv/current/set';
export const TYPE_START_LOADING_CURRENT = 'tv/current/startLoading';
export const TYPE_STOP_LOADING_CURRENT = 'tv/current/stopLoading';
export const TYPE_SET_CURRENT_ERROR = 'tv/current/error';
export const TYPE_UPDATE_CURRENT_FILE = 'tv/current/file/update';
export const TYPE_UPDATE_WATCH_STATUS = 'tv/current/updateWatchStatus';

export const updateWatchStatus = data => ({
  type: TYPE_UPDATE_WATCH_STATUS,
  data,
});

export const updateCurrentFile = (fileId, data) => ({
  type: TYPE_UPDATE_CURRENT_FILE,
  fileId,
  data,
});

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

export const getCurrent = (id, forceReload = false) => async (
  dispatch,
  getState,
  api,
) => {
  const current = get(getState(), 'tv.current.data');
  if (!forceReload && get(current, 'id') === id) {
    return current;
  }

  const loadingKey = createRandom(12);
  dispatch(startLoadingCurrent(loadingKey));
  try {
    const { data } = await api.tv.get({ routeParams: { tv: id } });
    dispatch(setCurrent(data));
    return data;
  } catch (e) {
    dispatch(setCurrentError(handleApiError(e)));
    return null;
  } finally {
    dispatch(stopLoadingCurrent(loadingKey));
  }
};
