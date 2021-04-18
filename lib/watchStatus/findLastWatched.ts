import { WatchStatusType } from '../../types/WatchStatusType';

const findLastWatched = (
  watchStatus: WatchStatusType[],
): WatchStatusType | null => {
  let lastSeen: WatchStatusType | null = null;
  for (let i = 0, sz = watchStatus.length; i < sz; i++) {
    if (
      lastSeen === null ||
      watchStatus[i].seasonNumber! > lastSeen.seasonNumber! ||
      (watchStatus[i].seasonNumber === lastSeen.seasonNumber &&
        watchStatus[i].episodeNumber! > lastSeen.episodeNumber!)
    ) {
      lastSeen = watchStatus[i];
    }
  }
  return lastSeen;
};

export default findLastWatched;
