const findEpisode = (seasons, callback) => {
  if (!seasons || seasons.length <= 0) {
    return null;
  }

  for (let i = 0, ssz = seasons.length; i < ssz; i++) {
    const episodes = seasons[i].episodes || [];
    for (let j = 0, esz = episodes.length; j < esz; j++) {
      if (callback(episodes[j])) {
        return { episode: episodes[j], season: seasons[i] };
      }
    }
  }

  return null;
};

export default findEpisode;
