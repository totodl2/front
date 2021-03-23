import combineReducers from '../../../lib/combineReducers';
import moviesCurrentReducers from './moviesCurrent';
export default combineReducers({
  current: moviesCurrentReducers,
});
