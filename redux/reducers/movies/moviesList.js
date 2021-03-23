import {
  TYPE_SET_LIST_ERROR,
  TYPE_SET_LIST,
  TYPE_STOP_LOADING_LIST,
  TYPE_START_LOADING_LIST,
} from '../../actions/moviesList';

export default (state = {}, action) => {
  if (action.type === TYPE_START_LOADING_LIST) {
    const { data, ...newState } = state;
    return {
      ...newState,
      error: null,
      loading: true,
      loadingKey: action.loadingKey,
    };
  }
  if (action.type === TYPE_STOP_LOADING_LIST) {
    const { loadingKey, ...newState } = state;
    return {
      ...newState,
      loading: false,
    };
  }
  if (action.type === TYPE_SET_LIST) {
    return {
      ...state,
      error: null,
      data: action.data,
    };
  }
  if (action.type === TYPE_SET_LIST_ERROR) {
    const { data, ...newState } = state;
    return {
      ...newState,
      error: action.error,
    };
  }
  return state;
};
