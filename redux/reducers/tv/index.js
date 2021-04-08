import combineReducers from '../../../lib/combineReducers';
import tvCurrentReducers from './tvCurrent';
import tvListReducers from './tvList';

export default combineReducers({
  current: tvCurrentReducers,
  list: tvListReducers,
});
