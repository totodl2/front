import get from 'lodash/get';
import setFp from 'lodash/fp/set';
import findIndex from 'lodash/findIndex';

import {
  TYPE_SET_TORRENTS,
  TYPE_SET_TORRENT_FULL,
  TYPE_UPDATE_TORRENT_FILE,
  TYPE_CREATE_TORRENT_FILE,
  TYPE_PATCH_TORRENT,
  TYPE_REMOVE_TORRENT,
  TYPE_ADD_TORRENT,
} from '../../actions/torrents';

export const filesKey = '$$files';

/**
 * @param {Array} files
 */
const processFiles = (files, defaultOut = {}) => {
  let out = defaultOut;
  files.forEach(file => {
    if (!file.directory) {
      const newFiles = [...(get(out, filesKey) || [])];
      newFiles.push(file);
      out = setFp(filesKey, newFiles, out);
      return;
    }

    const path = file.directory.split('/');
    const directory = { ...get(out, path, {}) };
    if (!directory[filesKey]) {
      directory[filesKey] = [];
    }
    directory[filesKey].push(file);
    out = setFp(path, directory, out);
  });
  return out;
};

/**
 * @param {Object} files
 * @param {string} id
 * @param {string|''} prevPath
 * @returns {string|boolean}
 */
const retrieveFilePath = (files, id, prevPath = '') => {
  if (!files) {
    return false;
  }

  const keys = Object.keys(files);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const keyEscaped = key.replace(/'/gi, "\\'");
    if (key === filesKey) {
      const idx = findIndex(files[key], f => f.id === id);
      if (idx !== -1) {
        return `${prevPath}['${keyEscaped}'][${idx}]`;
      }
    } else {
      const found = retrieveFilePath(
        files[key],
        id,
        `${prevPath}['${keyEscaped}']`,
      );
      if (found !== false) {
        return found;
      }
    }
  }
  return false;
};

const torrentsDataReducers = (state = [], action) => {
  if (action.type === TYPE_SET_TORRENTS) {
    return action.data.reduce((prev, torrent) => {
      // eslint-disable-next-line no-param-reassign
      prev.push({
        ...torrent,
        fullyLoaded: false,
      });
      return prev;
    }, []);
  }
  if (action.type === TYPE_SET_TORRENT_FULL) {
    const idx = findIndex(state, t => t.hash === action.hash);
    if (idx === -1) {
      return state;
    }
    return setFp(
      `[${idx}]`,
      {
        ...action.data,
        files: processFiles(get(action.data, 'files', [])),
        fullyLoaded: true,
      },
      state,
    );
  }
  if (action.type === TYPE_CREATE_TORRENT_FILE) {
    const idx = findIndex(state, t => t.hash === action.hash);
    if (idx === -1 || !state[idx] || !state[idx].fullyLoaded) {
      return state;
    }
    return setFp(
      `[${idx}].files`,
      processFiles([action.data], get(state, `[${idx}].files`, {})),
      state,
    );
  }
  if (action.type === TYPE_UPDATE_TORRENT_FILE) {
    const idx = findIndex(state, t => t.hash === action.hash);
    if (idx === -1 || !state[idx] || !state[idx].files) {
      return state;
    }

    const filePath = retrieveFilePath(state[idx].files, action.id);
    if (filePath === false) {
      return state;
    }

    const path = `[${idx}].files${filePath}`;
    return setFp(
      path,
      {
        ...get(state, path, {}),
        ...action.data,
      },
      state,
    );
  }
  if (action.type === TYPE_PATCH_TORRENT) {
    const idx = findIndex(state, t => t.hash === action.hash);
    if (idx === -1) {
      return state;
    }
    return setFp(
      `[${idx}]`,
      {
        ...(state[idx] || {}),
        ...action.data,
      },
      state,
    );
  }
  if (action.type === TYPE_REMOVE_TORRENT) {
    return state.filter(t => t.hash !== action.hash);
  }
  if (action.type === TYPE_ADD_TORRENT) {
    return [action.data, ...state];
  }
  return state;
};

export default torrentsDataReducers;