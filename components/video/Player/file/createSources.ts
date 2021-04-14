import { FileType } from '../../../../types/FileType';
import { MediaSource } from '../types';

const createSources = (file: FileType): MediaSource[] => [
  {
    src: file.vodUrl!,
    type: 'application/x-mpegURL',
  },
];

export default createSources;
