import { TranscodedElementType } from './TranscodedElementType';

export type FileType = {
  id: string;
  torrentHash: string;
  name: string;
  basename: string | null;
  directory: string | null;
  extension: string | null;
  bytesCompleted: BigInt;
  length: BigInt;
  priority: number;
  position: number;
  wanted: boolean;
  hostId: number;
  createdAt: string;
  updatedAt: string;
  transcoded: TranscodedElementType[] | null;
  transcodingStatus: {
    [key: string]: { job: string; progress: number };
  } | null;
  transcodingQueuedAt: string | null;
  transcodingFailedAt: string | null;
  transcodedAt: string | null;
  movieId: number | null;
  tvId: number | null;
  seasonNumber: number | null;
  episodeNumber: number | null;
  url?: string;
  userId?: number | null;
  vodUrl: string | null;
};
