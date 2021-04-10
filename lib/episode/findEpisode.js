const findEpisode = (seasons, callback) => {
  if (!seasons || seasons.length <= 0) {
    return null;
  }

  let previous = null;
  for (let i = 0, ssz = seasons.length; i < ssz; i++) {
    const episodes = seasons[i].episodes || [];
    for (let j = 0, esz = episodes.length; j < esz; j++) {
      const current = { episode: episodes[j], season: seasons[i] };
      if (callback(current, previous)) {
        return current;
      }
      previous = current;
    }
  }

  return null;
};

export default findEpisode;
