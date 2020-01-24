import React from 'react';
import PropTypes from 'prop-types';
import {
  Archive,
  Book,
  Cpu,
  Disc,
  File,
  FileText,
  Film,
  Globe,
  Image,
  Music,
  Terminal,
} from 'react-feather';

const types = {
  bat: Terminal,

  png: Image,
  jpeg: Image,
  jpg: Image,
  bmp: Image,
  gif: Image,
  psd: Image,

  zip: Archive,
  tgz: Archive,
  rar: Archive,
  gz: Archive,

  iso: Disc,
  bin: Disc,
  cue: Disc,
  mds: Disc,
  mdf: Disc,
  img: Disc,
  fdi: Disc,
  disk: Disc,
  nrg: Disc,
  vmdk: Disc,
  vmwarevm: Disc,
  xdf: Disc,

  exe: Cpu,
  dmg: Cpu,
  setup: Cpu,

  nfo: FileText,
  txt: FileText,
  srt: FileText,
  ssa: FileText,
  sig: FileText,
  asc: FileText,
  xls: FileText,
  doc: FileText,
  docx: FileText,
  ini: FileText,

  html: Globe,
  htm: Globe,
  url: Globe,

  pdf: Book,
  epub: Book,
  azw: Book,
  lit: Book,
  lrf: Book,
  lrx: Book,
  opf: Book,
  pdg: Book,
  tr2: Book,
  tr3: Book,
  ybk: Book,
  mobi: Book,
  azw3: Book,
  cbr: Book,
  cbz: Book,

  rm: Film,
  mpg: Film,
  mpeg: Film,
  mov: Film,
  avi: Film,
  mp4: Film,
  mkv: Film,

  mp3: Music,
  wma: Music,
  wav: Music,
  flac: Music,
  ogg: Music,
};

const ExtensionIcon = ({ ext, ...props }) => {
  const lExt = (ext || '').toLowerCase();

  if (types[lExt]) {
    const Icon = types[lExt];
    return <Icon {...props} />;
  }

  return <File {...props} />;
};

ExtensionIcon.propTypes = {
  ext: PropTypes.string,
};

export default ExtensionIcon;
