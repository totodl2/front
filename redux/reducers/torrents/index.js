import torrentsDataReducers from './crud';
import torrentsSearchReducers from './search';
import { TYPE_SET_TORRENTS } from '../../actions/torrents';

const initialState = {
  data: [],
  search: { searching: false, results: [] },
};

const torrentsReducers = (state = initialState, action) => {
  const data = torrentsDataReducers(state.data, action);

  let newState = state;
  if (data !== state.data) {
    newState = { ...state, data };

    if (action.type === TYPE_SET_TORRENTS) {
      newState.loaded = true;
    }
  }

  return torrentsSearchReducers(newState, action);
};

export default torrentsReducers;
