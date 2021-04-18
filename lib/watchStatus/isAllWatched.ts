import { WatchStatusType } from '../../types/WatchStatusType';

const isAllWatched = (watchStatus?: WatchStatusType | null): boolean => {
  if (!watchStatus) {
    return false;
  }

  const pc = watchStatus.position / watchStatus.length;
  return pc >= 0.95;
};

export default isAllWatched;
