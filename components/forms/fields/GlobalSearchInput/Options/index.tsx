import React, { ReactNode } from 'react';
import { OptionProps } from 'react-select';
import {
  AllGlobalSearchResultTypes,
  TYPES,
} from '../../../../../types/GlobalSearchResultTypes';
import MovieOption from './MovieOption';
import TvOption from './TvOption';
import TorrentOption from './TorrentOption';
import FileOption from './FileOption';

const Option = (
  props: OptionProps<AllGlobalSearchResultTypes, false>,
): ReactNode => {
  if (props.data.type === TYPES.MOVIE) {
    // @ts-ignore
    return <MovieOption {...props} />;
  }

  if (props.data.type === TYPES.TV_SHOW) {
    // @ts-ignore
    return <TvOption {...props} />;
  }

  if (props.data.type === TYPES.TORRENT) {
    // @ts-ignore
    return <TorrentOption {...props} />;
  }

  if (props.data.type === TYPES.FILE) {
    // @ts-ignore
    return <FileOption {...props} />;
  }

  throw new Error(`Invalid result type ${props.data.type}`);
};

export default Option;
