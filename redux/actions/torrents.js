import createRandom from '../../lib/createRandom';
import {
  CHECK_WAIT,
  STOPPED,
} from '../../components/presentationals/torrentCard/status';

export const TYPE_START_LOADING_TORRENTS = 'torrents/startLoading';
export const TYPE_STOP_LOADING_TORRENTS = 'torrents/stopLoading';
export const TYPE_SET_TORRENTS = 'torrents/setTorrents';
export const TYPE_SET_TORRENT_FULL = 'torrents/setTorrentFull';
export const TYPE_PATCH_TORRENT = 'torrents/patchTorrent';
export const TYPE_REMOVE_TORRENT = 'torrents/remove';

const startLoading = loadingKey => ({
  loadingKey,
  type: TYPE_START_LOADING_TORRENTS,
});

const stopLoading = loadingKey => ({
  loadingKey,
  type: TYPE_STOP_LOADING_TORRENTS,
});

const setTorrents = data => ({
  type: TYPE_SET_TORRENTS,
  data,
});

const setTorrent = (hash, data) => ({
  type: TYPE_SET_TORRENT_FULL,
  data,
  hash,
});

const patch = (hash, data) => ({
  type: TYPE_PATCH_TORRENT,
  hash,
  data,
});

const removeTorrent = hash => ({ type: TYPE_REMOVE_TORRENT, hash });

export const getAll = () => async (dispatch, getState, api) => {
  const loadingKey = createRandom(12);
  dispatch(startLoading(loadingKey));
  try {
    const { data } = await api.torrents.getAll();
    dispatch(setTorrents(data));
    return data;
  } finally {
    dispatch(stopLoading(loadingKey));
  }
};

export const get = hash => async (dispatch, getState, api) => {
  dispatch(patch(hash, { loading: true }));

  const { data } = await api.torrents.get({ routeParams: { hash } });
  dispatch(setTorrent(hash, data));
  return data;
};

export const pause = hash => async (dispatch, getState, api) => {
  dispatch(patch(hash, { status: STOPPED }));
  await api.torrents.pause({ routeParams: { hash } });
};

export const start = hash => async (dispatch, getState, api) => {
  dispatch(patch(hash, { status: CHECK_WAIT }));
  await api.torrents.start({ routeParams: { hash } });
};

export const remove = hash => async (dispatch, getState, api) => {
  dispatch(removeTorrent(hash));
  await api.torrents.remove({ routeParams: { hash } });
};
