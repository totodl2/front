export const STOPPED = 0;
export const CHECK_WAIT = 1;
export const CHECK = 2;
export const DOWNLOAD_WAIT = 3;
export const DOWNLOAD = 4;
export const SEED_WAIT = 5;
export const SEED = 6;

export default {
  STOPPED,
  CHECK_WAIT,
  CHECK,
  DOWNLOAD_WAIT,
  DOWNLOAD,
  SEED_WAIT,
  SEED,
};

export const isSeeding = status => status === SEED || status === SEED_WAIT;
export const isDownloading = status =>
  status === DOWNLOAD_WAIT || status === DOWNLOAD;
export const isChecking = status => status === CHECK || status === CHECK_WAIT;
export const isStopped = status => status === STOPPED;
