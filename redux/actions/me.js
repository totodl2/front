import get from 'lodash/get';

import createRandom from '../../lib/createRandom';
export const TYPE_UPDATE_ME = 'me/update';
export const TYPE_SET_ME = 'me/set';
export const TYPE_START_LOADING_ME = 'me/startLoading';
export const TYPE_STOP_LOADING_ME = 'me/stopLoading';
export const TYPE_DESTROY_ME = 'me/destroy';

const startLoading = loadingKey => ({
  loadingKey,
  type: TYPE_START_LOADING_ME,
});

const stopLoading = loadingKey => ({
  loadingKey,
  type: TYPE_STOP_LOADING_ME,
});

export const setMe = data => ({
  type: TYPE_SET_ME,
  data,
});

export const updateMe = data => ({
  type: TYPE_UPDATE_ME,
  data,
});

export const destroyMe = () => ({
  type: TYPE_DESTROY_ME,
});

export const getMe = (forceReload = false) => async (
  dispatch,
  getState,
  api,
) => {
  const user = get(getState(), 'me.data', {});
  if (!forceReload && user.id) {
    return user;
  }

  const loadingKey = createRandom(12);
  dispatch(startLoading(loadingKey));
  try {
    const { data } = await api.users.me();
    dispatch(setMe(data));
    return data;
  } finally {
    dispatch(stopLoading(loadingKey));
  }
};
