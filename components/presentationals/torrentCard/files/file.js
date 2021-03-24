import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import {
  Play,
  Info,
  MoreVertical,
  Trash,
  Download,
  Edit2,
} from 'react-feather';
import Link from 'next/link';
import Dropdown from 'reactstrap/lib/Dropdown';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownItem from 'reactstrap/lib/DropdownItem';

import ExtensionIcon from './extensionIcon';

import styles from './file.module.scss';
import PrettyBytes from '../../prettyBytes';
import TranscoderStatus from './transcoderStatus';
import ToggleContainer from '../../../containers/ToggleContainer';

class File extends PureComponent {
  static propTypes = {
    file: PropTypes.object.isRequired,
    className: PropTypes.string,
    onPlay: PropTypes.func,
    hideInfo: PropTypes.bool,
    onChangeMetadata: PropTypes.func,
    onRemoveMetadata: PropTypes.func,
  };

  state = {
    confirmRemoveMetadata: false,
  };

  onConfirmMetadataDiscard = () =>
    this.setState({ confirmRemoveMetadata: false });

  onRemoveMetadata = evt => {
    if (!this.state.confirmRemoveMetadata) {
      this.setState({ confirmRemoveMetadata: true });
      evt.stopPropagation();
      return;
    }

    const { file, onRemoveMetadata } = this.props;
    onRemoveMetadata(file.id);
  };

  onChangeMetadata = () => {
    const { file, onChangeMetadata } = this.props;
    return onChangeMetadata(file);
  };

  render() {
    const {
      file,
      className,
      onPlay,
      hideInfo,
      onChangeMetadata,
      onRemoveMetadata,
    } = this.props;
    const { confirmRemoveMetadata } = this.state;
    const { movieId, transcodingQueuedAt, transcodedAt } = file;
    const completed = file.bytesCompleted === file.length;
    const transcoded = (file.transcoded || []).filter(f => f.type === 'media');

    const hasMetadata = !!movieId;
    const content = (
      <>
        {!completed && (
          <div
            className={styles.fileProgress}
            style={{
              right: `${100 -
                Math.round((file.bytesCompleted / file.length) * 10000) /
                  100}%`,
            }}
          />
        )}
        <div className={styles.fileLabel}>
          <span className={styles.fileIcon}>
            <ExtensionIcon ext={file.extension} />
          </span>
          <span className={styles.fileLabelSpan}>
            {completed ? <a href={file.url}>{file.basename}</a> : file.basename}
          </span>
          {(transcoded.length > 0 ||
            onChangeMetadata ||
            (hasMetadata && onRemoveMetadata)) &&
            completed && (
              <ToggleContainer
                view={Dropdown}
                direction="left"
                onToggle={this.onConfirmMetadataDiscard}
                className="float-right"
              >
                <DropdownToggle
                  tag="button"
                  className="btn btn-round shadow-none btn-sm"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <MoreVertical />
                </DropdownToggle>
                <DropdownMenu>
                  {transcoded.length > 0 &&
                    transcoded.map(media => (
                      <DropdownItem
                        tag="a"
                        href={media.url}
                        key={media.preset}
                        className={styles.fileTranscoded}
                      >
                        <Download className="mr-2" />
                        {media.preset}
                      </DropdownItem>
                    ))}
                  {onChangeMetadata && (
                    <DropdownItem onClick={this.onChangeMetadata}>
                      <Edit2 className="mr-2" />
                      {hasMetadata ? 'Change metadata' : 'Set metadata'}
                    </DropdownItem>
                  )}
                  {onRemoveMetadata && hasMetadata && (
                    <DropdownItem
                      className={confirmRemoveMetadata ? 'text-danger' : ''}
                      onClick={this.onRemoveMetadata}
                    >
                      <Trash className="mr-2" />
                      {confirmRemoveMetadata
                        ? 'Click again to confirm'
                        : 'Remove metadata'}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </ToggleContainer>
            )}
          <span className={styles.fileSize}>
            {!completed && (
              <>
                <PrettyBytes bytes={file.bytesCompleted} /> /
              </>
            )}
            <PrettyBytes bytes={file.length} />
          </span>
          {movieId && !hideInfo && (
            <Link
              href="/in/movies/[id]"
              as={`/in/movies/${encodeURIComponent(movieId.toString())}`}
            >
              <a
                className={cl(
                  'btn btn-sm btn-outline-primary',
                  styles.fileMediaInfo,
                )}
              >
                <Info className="mr-2" />
                Info
              </a>
            </Link>
          )}
          {transcoded.length > 0 && onPlay && (
            <span className={styles.filePlay}>
              <button
                type="button"
                onClick={() => onPlay(file)}
                className="btn btn-sm btn-outline-primary"
              >
                <Play className="mr-2" />
                Play
              </button>
            </span>
          )}
          {transcodingQueuedAt && !transcodedAt && (
            <span className={styles.fileTranscodingStatus}>
              <TranscoderStatus
                id={file.id}
                status={file.transcodingStatus}
                finishedAt={file.transcodedAt}
                failedAt={file.transcodingFailedAt}
                queuedAt={transcodingQueuedAt}
              />
            </span>
          )}
        </div>
        <div className="clearfix" />
      </>
    );

    return <div className={cl(className, styles.file)}>{content}</div>;
  }
}

export default File;
