import torrentsDataReducers from './crud';
import torrentsSearchReducers from './search';

const initialState = {
  data: [],
  search: { searching: false, results: [] },
};

export default (state = initialState, action) => {
  const data = torrentsDataReducers(state.data, action);

  let newState = state;
  if (data !== state.data) {
    newState = { ...state, data };
  }

  return torrentsSearchReducers(newState, action);
};
