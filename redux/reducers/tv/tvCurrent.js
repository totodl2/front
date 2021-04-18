import setFp from 'lodash/fp/set';
import {
  TYPE_SET_CURRENT_ERROR,
  TYPE_SET_CURRENT,
  TYPE_STOP_LOADING_CURRENT,
  TYPE_START_LOADING_CURRENT,
  TYPE_UPDATE_CURRENT_FILE,
  TYPE_UPDATE_WATCH_STATUS,
} from '../../actions/tvCurrent';

const findFilePath = (seasons = [], fileId) => {
  for (let i = 0, ssz = seasons.length; i < ssz; i++) {
    const { episodes = [] } = seasons[i];
    for (let j = 0, esz = episodes.length; j < esz; j++) {
      const { files = [] } = episodes[j];
      const fileIdx = files.findIndex(file => file.id === fileId);
      if (fileIdx !== -1) {
        return {
          file: files[fileIdx],
          path: `seasons[${i}].episodes[${j}].files[${fileIdx}]`,
        };
      }
    }
  }

  return null;
};

const tvCurrentReducer = (state = {}, action) => {
  if (action.type === TYPE_START_LOADING_CURRENT) {
    const { data, ...oldState } = state;
    return {
      ...oldState,
      error: null,
      loading: true,
      loadingKey: action.loadingKey,
    };
  }
  if (action.type === TYPE_STOP_LOADING_CURRENT) {
    const { loadingKey, ...oldState } = state;
    return {
      ...oldState,
      loading: false,
    };
  }
  if (action.type === TYPE_SET_CURRENT) {
    return {
      ...state,
      error: null,
      data: action.data,
    };
  }
  if (action.type === TYPE_SET_CURRENT_ERROR) {
    const { data, ...oldState } = state;
    return {
      ...oldState,
      error: action.error,
    };
  }
  if (action.type === TYPE_UPDATE_WATCH_STATUS) {
    const { data, ...oldState } = state;
    if (!data) {
      return state;
    }
    const watchStatus = (data || {}).watchStatus || [];
    const offset = watchStatus.findIndex(ws => ws.id === action.data.id);
    if (offset === -1) {
      return {
        ...oldState,
        data: { ...data, watchStatus: [...watchStatus, action.data] },
      };
    }

    return setFp(`data.watchStatus[${offset}]`, action.data, state);
  }
  if (action.type === TYPE_UPDATE_CURRENT_FILE && state.data) {
    const {
      data: { lost, seasons },
    } = state;

    const lostIndex = (lost || []).findIndex(file => file.id === action.fileId);
    if (lostIndex !== -1) {
      return setFp(
        `data.lost[${lostIndex}]`,
        {
          ...lost[lostIndex],
          ...action.data,
        },
        state,
      );
    }

    const result = findFilePath(seasons, action.fileId);
    if (result === null) {
      return state;
    }

    const { file, path } = result;
    return setFp(
      `data.${path}`,
      {
        ...file,
        ...action.data,
      },
      state,
    );
  }
  return state;
};

export default tvCurrentReducer;
