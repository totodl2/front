import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import reducers from './reducers';

export function initializeStore(api, initialState = {}) {
  return createStore(
    combineReducers({
      ...reducers,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
  );
}
