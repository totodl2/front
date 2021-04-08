import {
  TYPE_SET_LIST_ERROR,
  TYPE_SET_LIST,
  TYPE_STOP_LOADING_LIST,
  TYPE_START_LOADING_LIST,
} from '../../actions/tvList';

export default (state = { genres: [] }, action) => {
  if (action.type === TYPE_START_LOADING_LIST) {
    return {
      ...state,
      data: action.from === 0 ? [] : state.data,
      genreId: action.genreId,
      hasMore: true,
      error: null,
      loading: true,
      loadingKey: action.loadingKey,
    };
  }
  if (action.type === TYPE_STOP_LOADING_LIST) {
    const { loadingKey, ...oldState } = state;
    return {
      ...oldState,
      loading: false,
    };
  }
  if (action.type === TYPE_SET_LIST) {
    const { data: tvList, genres } = action.data;
    const newState = {
      ...state,
      error: null,
      genreId: action.genreId,
      hasMore: tvList.length > 0,
      genres,
    };
    if (action.from > 0) {
      newState.data = newState.data.slice(0, action.from).concat(tvList);
    } else {
      newState.data = tvList;
    }
    return newState;
  }
  if (action.type === TYPE_SET_LIST_ERROR) {
    const { data, ...oldState } = state;
    return {
      ...oldState,
      error: action.error,
    };
  }
  return state;
};
