import combineReducers from '../../../lib/combineReducers';
import moviesCurrentReducers from './moviesCurrent';
import moviesListReducers from './moviesList';

const moviesReducers = combineReducers({
  current: moviesCurrentReducers,
  list: moviesListReducers,
});

export default moviesReducers;
