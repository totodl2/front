import setFp from 'lodash/fp/set';
import get from 'lodash/get';

import {
  TYPE_SET_CURRENT_ERROR,
  TYPE_SET_CURRENT,
  TYPE_STOP_LOADING_CURRENT,
  TYPE_START_LOADING_CURRENT,
  TYPE_UPDATE_CURRENT_FILE,
} from '../../actions/moviesCurrent';

export default (state = {}, action) => {
  if (action.type === TYPE_START_LOADING_CURRENT) {
    const { data, ...newState } = state;
    return {
      ...newState,
      error: null,
      loading: true,
      loadingKey: action.loadingKey,
    };
  }
  if (action.type === TYPE_STOP_LOADING_CURRENT) {
    const { loadingKey, ...newState } = state;
    return {
      ...newState,
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
    const { data, ...newState } = state;
    return {
      ...newState,
      error: action.error,
    };
  }
  if (action.type === TYPE_UPDATE_CURRENT_FILE) {
    const files = get(state, 'data.files');
    if (!files) {
      return state;
    }
    const idx = files.findIndex(file => file.id === action.fileId);
    if (idx === -1) {
      return state;
    }

    return setFp(
      `data.files[${idx}]`,
      {
        ...files[idx],
        ...action.data,
      },
      state,
    );
  }
  return state;
};
