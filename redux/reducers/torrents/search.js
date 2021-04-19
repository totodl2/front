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

const keywordsSearch = (keywords, torrents) => {
  const regex = getKeywordRegex(keywords);

  return torrents.reduce((prev, torrent) => {
    const searchIn = removeAccents
      .remove(`${torrent.name} ${torrent.user ? torrent.user.nickname : ''}`)
      .toLowerCase();

    if (searchIn.match(regex)) {
      prev.push(torrent.hash);
    }

    return prev;
  }, []);
};

const userSearch = (user, torrents) =>
  torrents
    .filter(
      torrent => torrent.user && torrent.user.nickname.toLowerCase() === user,
    )
    .map(torrent => torrent.hash);

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
          keywords: '',
          results: [],
        },
      };
    }
    return state;
  }

  let results = null;
  const match = action.keywords.match(/^user:(\S*)$/i);
  if (match) {
    results = userSearch(match[1].toLowerCase(), state.data);
  } else {
    results = keywordsSearch(action.keywords, state.data);
  }

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
