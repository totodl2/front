import combineReducers from '../../../lib/combineReducers';
import moviesCurrentReducers from './moviesCurrent';
import moviesListReducers from './moviesList';

export default combineReducers({
  current: moviesCurrentReducers,
  list: moviesListReducers,
});
