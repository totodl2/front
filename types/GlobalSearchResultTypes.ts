import { Maybe } from './Maybe';

export enum TYPES {
  MOVIE = 'movie',
  TV_SHOW = 'tv',
  TORRENT = 'torrent',
  FILE = 'file',
}

export type GlobalSearchResultType = {
  documentId: string;
  name: string;
  createdAt: string;
};

export type MovieResultType = GlobalSearchResultType & {
  type: TYPES.MOVIE;
  id: number;
  originalName: Maybe<string>;
  overview: Maybe<string>;
  genres: string[];
  releaseDate: Maybe<string>;
  posterPath: Maybe<string>;
};

export type TvResultType = GlobalSearchResultType & {
  id: number;
  originalName: Maybe<string>;
  overview: Maybe<string>;
  genres: string[];
  lastAirDate: Maybe<string>;
  type: TYPES.TV_SHOW;
  posterPath: Maybe<string>;
};

export type TorrentResultType = GlobalSearchResultType & {
  hash: string;
  uploader: Maybe<string>;
  type: TYPES.TORRENT;
};

export type FileResultType = GlobalSearchResultType & {
  id: string;
  hash: string;
  extension: Maybe<string>;
  type: TYPES.FILE;
  torrentName: string;
  episodeNumber: Maybe<number>;
  seasonNumber: Maybe<number>;
  url: Maybe<string>;
};

export type AllGlobalSearchResultTypes =
  | MovieResultType
  | TvResultType
  | TorrentResultType
  | FileResultType;
