import { FileType } from '../../../../types/FileType';
import { TextTrack } from '../types';

const createTracks = (file: FileType): TextTrack[] =>
  (file.transcoded || [])
    .filter(el => el.type === 'sub')
    .map(sub => ({
      kind: 'caption',
      label: sub.title,
      srclang: sub.lang,
      src: sub.url,
    }));

export default createTracks;
