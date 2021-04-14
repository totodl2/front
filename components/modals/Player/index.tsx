import React, { ReactNode } from 'react';
import cl from 'classnames';

import Player from '../../video/Player';

import styles from './index.module.scss';
import { FileType } from '../../../types/FileType';

export type PlayerModalType = {
  isOpen: boolean;
  close: () => void;
  className?: string;
  file: FileType;
  title?: string;
};

const PlayerModal = ({
  isOpen,
  close,
  title,
  file,
  ...props
}: PlayerModalType): ReactNode | null => {
  if (!isOpen) {
    return null;
  }

  return (
    <Player
      {...props}
      title={title || file.basename}
      file={file}
      onClose={close}
      className={cl(styles.playerContainer)}
      videoClassName={styles.playerContainerVideo}
    />
  );
};

export default PlayerModal;
