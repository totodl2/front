export const getDownloadPercent = (torrent, precision = 2) => {
  const { sizeWhenDone } = torrent;
  if (sizeWhenDone <= 0) {
    return 0;
  }

  const pc = 10 ** precision;
  return (
    Math.round(
      ((sizeWhenDone - torrent.leftUntilDone) / sizeWhenDone) * 100 * pc,
    ) / pc
  );
};

export const getSeedPercent = torrent => {
  const { uploadRatio, seedRatioLimit } = torrent;
  if (seedRatioLimit <= 0) {
    return 100;
  }

  return Math.round((uploadRatio / seedRatioLimit) * 10000) / 100;
};
