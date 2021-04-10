const getEpisodeNumberLabel = (seasonNumber, episodeNumber) =>
  `S${(seasonNumber || '').toString().padStart(2, '0')}E${(episodeNumber || '')
    .toString()
    .padStart(2, '0')}`;

export default getEpisodeNumberLabel;
