import createRandom from '../../lib/createRandom';

export const TYPE_START_LOADING_TORRENTS = 'torrents/startLoading';
export const TYPE_STOP_LOADING_TORRENTS = 'torrents/stopLoading';
export const TYPE_SET_TORRENTS = 'torrents/search/setTorrents';
export const TYPE_SET_TORRENT = 'torrents/search/setTorrent';

const startLoading = loadingKey => ({
  loadingKey,
  type: TYPE_START_LOADING_TORRENTS,
});

const stopLoading = loadingKey => ({
  loadingKey,
  type: TYPE_STOP_LOADING_TORRENTS,
});

const setData = data => ({
  type: TYPE_SET_TORRENTS,
  data,
});

export const getTorrents = () => async (dispatch, getState, api) => {
  const loadingKey = createRandom(12);
  dispatch(startLoading(loadingKey));
  try {
    const { data } = await api.torrents.getAll();
    dispatch(setData(data));
    return data;
  } finally {
    dispatch(stopLoading(loadingKey));
  }
};
