import {
  TYPE_SET_CONFIGURATION,
  TYPE_STOP_LOADING_CONFIGURATION,
  TYPE_START_LOADING_CONFIGURATION,
} from '../actions/metadataConfiguration';

const initialState = {};
const metadataConfigurationReducer = (state = initialState, action) => {
  if (action.type === TYPE_START_LOADING_CONFIGURATION) {
    return {
      ...state,
      loading: true,
      loadingKey: action.loadingKey,
    };
  }
  if (action.type === TYPE_STOP_LOADING_CONFIGURATION) {
    const { loadingKey, ...newState } = state;
    return {
      ...newState,
      loading: false,
    };
  }
  if (action.type === TYPE_SET_CONFIGURATION) {
    return {
      ...state,
      ...action.data,
    };
  }

  return state;
};

export default metadataConfigurationReducer;
