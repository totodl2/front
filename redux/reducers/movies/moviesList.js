import {
  TYPE_SET_LIST_ERROR,
  TYPE_SET_LIST,
  TYPE_STOP_LOADING_LIST,
  TYPE_START_LOADING_LIST,
} from '../../actions/moviesList';

const moviesListReducer = (state = { genres: [], watchStatus: [] }, action) => {
  if (action.type === TYPE_START_LOADING_LIST) {
    return {
      ...state,
      data: action.from === 0 ? [] : state.data,
      watchStatus: action.from === 0 ? [] : state.watchStatus,
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
    const { data: movies, genres, watchStatus } = action.data;
    const newState = {
      ...state,
      error: null,
      genreId: action.genreId,
      hasMore: movies.length > 0,
      genres,
    };
    if (action.from > 0) {
      newState.data = newState.data.slice(0, action.from).concat(movies);
      newState.watchStatus = newState.watchStatus
        .slice(0, action.from)
        .concat(watchStatus);
    } else {
      newState.data = movies;
      newState.watchStatus = watchStatus;
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

export default moviesListReducer;
