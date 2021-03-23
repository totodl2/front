import torrentsReducers from './torrents';
import meReducers from './me';
import metadataConfigurationReducers from './metadataConfiguration';
import moviesReducers from './movies';

const reducers = {
  torrents: torrentsReducers,
  me: meReducers,
  metadataConfiguration: metadataConfigurationReducers,
  movies: moviesReducers,
};

export default reducers;
