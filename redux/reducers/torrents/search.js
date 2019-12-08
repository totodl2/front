import removeAccents from 'remove-accents-diacritics';
import isEmpty from 'lodash/isEmpty';

import { TYPE_TORRENTS_SEARCH } from '../../actions/torrents';

// récupère les keywords, clean les accents et génère un regex basique
const getKeywordRegex = keyword =>
  new RegExp(
    `(${removeAccents
      .remove(keyword)
      .split(/\W/)
      .filter(e => e.replace(/\s*/, '').length > 0)
      .join('|')})`,
    'ig',
  );

const torrentsSearchReducers = (state, action) => {
  if (action.type !== TYPE_TORRENTS_SEARCH) {
    return state;
  }

  if (isEmpty(action.keywords)) {
    if (state.search.searching) {
      return {
        ...state,
        search: {
          searching: false,
          results: [],
        },
      };
    }
    return state;
  }

  const regex = getKeywordRegex(action.keywords);

  const results = state.data.reduce((prev, torrent) => {
    const searchIn = removeAccents
      .remove(`${torrent.name} ${torrent.user ? torrent.user.nickname : ''}`)
      .toLowerCase();

    if (searchIn.match(regex)) {
      prev.push(torrent.hash);
    }

    return prev;
  }, []);

  return {
    ...state,
    search: {
      searching: true,
      keywords: action.keywords,
      results,
    },
  };
};

export default torrentsSearchReducers;
