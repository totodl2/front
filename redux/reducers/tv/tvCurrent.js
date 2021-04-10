import {
  TYPE_SET_CURRENT_ERROR,
  TYPE_SET_CURRENT,
  TYPE_STOP_LOADING_CURRENT,
  TYPE_START_LOADING_CURRENT,
} from '../../actions/tvCurrent';

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
  return state;
};

export default tvCurrentReducer;
