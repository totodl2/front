import {
  TYPE_SET_ME,
  TYPE_START_LOADING_ME,
  TYPE_STOP_LOADING_ME,
  TYPE_UPDATE_ME,
} from '../actions/me';

const initialState = { data: {}, loading: false };
const meReducers = (state = initialState, action) => {
  if (action.type === TYPE_START_LOADING_ME) {
    return {
      ...state,
      loading: true,
      loadingKey: action.loadingKey,
    };
  }
  if (
    action.type === TYPE_STOP_LOADING_ME &&
    action.loadingKey === state.loadingKey
  ) {
    const { loadingKey, ...newState } = state;
    return {
      ...newState,
      loading: false,
    };
  }
  if (action.type === TYPE_SET_ME) {
    return {
      ...state,
      data: action.data,
    };
  }
  if (action.type === TYPE_UPDATE_ME) {
    return {
      ...state,
      data: {
        ...state.data,
        ...action.data,
      },
    };
  }

  return state;
};

export default meReducers;
