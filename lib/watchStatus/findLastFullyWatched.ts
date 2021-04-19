import { WatchStatusType } from '../../types/WatchStatusType';
import isAllWatched from './isAllWatched';

const findLastFullyWatched = (
  watchStatus: WatchStatusType[],
): WatchStatusType | null => {
  let lastSeen: WatchStatusType | null = null;
  for (let i = 0, sz = watchStatus.length; i < sz; i++) {
    if (
      lastSeen === null ||
      (isAllWatched(watchStatus[i]) &&
        (watchStatus[i].seasonNumber! > lastSeen.seasonNumber! ||
          (watchStatus[i].seasonNumber === lastSeen.seasonNumber &&
            watchStatus[i].episodeNumber! > lastSeen.episodeNumber!)))
    ) {
      lastSeen = watchStatus[i];
    }
  }
  return lastSeen;
};

export default findLastFullyWatched;
