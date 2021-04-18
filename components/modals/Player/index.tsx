import React, { ReactNode, PureComponent } from 'react';
import cl from 'classnames';

import Player, { PlayerTimeUpdateCallbackArgs } from '../../video/Player';

import styles from './index.module.scss';
import { FileType } from '../../../types/FileType';
import withContainer from '../../../lib/withContainer';
import WatchStatusContainer from '../../containers/WatchStatusContainer';
import { WatchStatusType } from '../../../types/WatchStatusType';
import Loader from '../../presentationals/waveLoader/index';

const SAVE_INTERVAL = 5 * 1000; // 5 seconds

export type PlayerModalType = {
  isOpen: boolean;
  close: () => void;
  className?: string;
  file: FileType;
  fileWatchStatus?: WatchStatusType | null;
  title?: string;
  getFileWatchStatus: (fileId: string) => Promise<WatchStatusType | null>;
  updateFileWatchStatus: (
    fileId: string,
    position: number,
    length: number,
  ) => Promise<WatchStatusType | null>;
  watchStatusLoading: boolean;
};

class PlayerModal extends PureComponent<PlayerModalType> {
  private lastSaved: number | null = null;

  private finished = false;

  componentDidMount() {
    this.props.getFileWatchStatus(this.props.file.id);
  }

  onTimeUpdate: PlayerTimeUpdateCallbackArgs = ({ duration, currentTime }) => {
    const {
      file: { id: fileId },
      updateFileWatchStatus,
    } = this.props;

    if (
      (this.lastSaved && this.lastSaved + SAVE_INTERVAL > Date.now()) ||
      this.finished
    ) {
      return;
    }

    this.lastSaved = Date.now();
    updateFileWatchStatus(
      fileId,
      Math.floor(currentTime),
      Math.floor(duration),
    );
  };

  onFinished = () => {
    this.finished = true;
    this.props.updateFileWatchStatus(this.props.file.id, 1, 1);
  };

  render(): ReactNode {
    const {
      watchStatusLoading,
      fileWatchStatus,
      isOpen,
      close,
      title,
      file,
    } = this.props;

    if (!isOpen) {
      return null;
    }

    if (watchStatusLoading) {
      return <Loader fill="page" visible />;
    }

    return (
      <Player
        title={title || file.basename}
        file={file}
        onClose={close}
        className={cl(styles.playerContainer)}
        videoClassName={styles.playerContainerVideo}
        watchStatus={fileWatchStatus}
        onTimeUpdate={this.onTimeUpdate}
        onEnded={this.onFinished}
        onGenericDetected={this.onFinished}
      />
    );
  }
}

export default withContainer(WatchStatusContainer)(PlayerModal);
