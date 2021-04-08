import torrentsReducers from './torrents';
import meReducers from './me';
import metadataConfigurationReducers from './metadataConfiguration';
import moviesReducers from './movies';
import tvReducers from './tv';

const reducers = {
  torrents: torrentsReducers,
  me: meReducers,
  metadataConfiguration: metadataConfigurationReducers,
  movies: moviesReducers,
  tv: tvReducers,
};

export default reducers;
