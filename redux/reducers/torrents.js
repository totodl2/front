import { combineReducers } from 'redux';
import {
  TYPE_STOP_LOADING_TORRENTS,
  TYPE_SET_TORRENTS,
  TYPE_SET_TORRENT_FULL,
  TYPE_START_LOADING_TORRENTS,
  TYPE_PATCH_TORRENT,
  TYPE_REMOVE_TORRENT,
} from '../actions/torrents';
import get from 'lodash/get';
import set from 'lodash/set';

export const filesKey = '$$files';

/**
 * @param {Array} files
 */
const processFiles = files => {
  const out = {};
  files.forEach(file => {
    if (!file.directory) {
      out[filesKey] = out[filesKey] || [];
      out[filesKey].push(file);
      return;
    }

    const path = file.directory.split('/');
    const directory = get(out, path, {});
    if (!directory[filesKey]) {
      directory[filesKey] = [];
    }
    directory[filesKey].push(file);
    set(out, path, directory);
  });
  return out;
};

const torrentsDataReducers = (state = { data: {} }, action) => {
  if (action.type === TYPE_SET_TORRENTS) {
    return action.data.reduce((prev, torrent) => {
      // eslint-disable-next-line no-param-reassign
      prev[torrent.hash] = {
        ...torrent,
        fullyLoaded: false,
      };
      return prev;
    }, {});
  }
  if (action.type === TYPE_SET_TORRENT_FULL) {
    return {
      ...state,
      [action.hash]: {
        ...action.data,
        files: processFiles(get(action.data, 'files', [])),
        fullyLoaded: true,
      },
    };
  }
  if (action.type === TYPE_PATCH_TORRENT) {
    return {
      ...state,
      [action.hash]: {
        ...(state[action.hash] || {}),
        ...action.data,
      },
    };
  }
  if (action.type === TYPE_REMOVE_TORRENT) {
    const { [action.hash]: removed, ...newState } = state;
    return newState;
  }
  return state;
};
export default combineReducers({
  data: torrentsDataReducers,
});
