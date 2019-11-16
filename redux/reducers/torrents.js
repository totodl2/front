import {
  TYPE_STOP_LOADING_TORRENTS,
  TYPE_SET_TORRENTS,
  TYPE_SET_TORRENT,
  TYPE_START_LOADING_TORRENTS,
} from '../actions/torrents';

const torrentsReducers = (state = {}, action) => {
  if (action.type === TYPE_SET_TORRENTS) {
    return {
      data: action.data,
    };
  }
  return state;
};
export default torrentsReducers;
