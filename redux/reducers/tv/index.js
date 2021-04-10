import combineReducers from '../../../lib/combineReducers';
import tvCurrentReducers from './tvCurrent';
import tvListReducers from './tvList';

const tvReducers = combineReducers({
  current: tvCurrentReducers,
  list: tvListReducers,
});

export default tvReducers;
