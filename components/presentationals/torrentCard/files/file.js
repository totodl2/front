import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { ReactComponent as Play } from 'feather-icons/dist/icons/play.svg';
import { ReactComponent as Info } from 'feather-icons/dist/icons/info.svg';
import Link from 'next/link';

import ExtensionIcon from './extensionIcon';

import styles from './file.module.scss';
import PrettyBytes from '../../prettyBytes';
import TranscoderStatus from './transcoderStatus';
import FileDropdown from './fileDropdown';
import CheckboxGroup from '../../../forms/fields/Checkbox/CheckboxGroup';

class File extends PureComponent {
  static propTypes = {
    file: PropTypes.object.isRequired,
    className: PropTypes.string,
    onPlay: PropTypes.func,
    hideInfo: PropTypes.bool,
    onChangeMovieMetadata: PropTypes.func,
    onChangeTvMetadata: PropTypes.func,
    onRemoveMetadata: PropTypes.func,
    onTranscode: PropTypes.func,
    selectable: PropTypes.bool,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func,
    onUnSelect: PropTypes.func,
    showSelect: PropTypes.bool,
  };

  onRemoveMetadata = () => {
    const { file, onRemoveMetadata } = this.props;
    onRemoveMetadata(file.id);
  };

  onChangeMovieMetadata = () => {
    const { file, onChangeMovieMetadata } = this.props;
    return onChangeMovieMetadata(file);
  };

  onChangeTvMetadata = () => {
    const { file, onChangeTvMetadata } = this.props;
    return onChangeTvMetadata([file]);
  };

  onTranscode = () => {
    const { file, onTranscode } = this.props;
    return onTranscode(file.id);
  };

  toggleSelect = () => {
    const { file, onSelect, onUnSelect, isSelected } = this.props;
    if (isSelected) {
      onUnSelect(file);
    } else {
      onSelect(file);
    }
  };

  render() {
    const {
      file,
      className,
      onPlay,
      hideInfo,
      onChangeMovieMetadata,
      onChangeTvMetadata,
      onRemoveMetadata,
      onTranscode,
      selectable,
      isSelected,
      showSelect,
    } = this.props;
    const {
      movieId,
      tvId,
      transcodingQueuedAt,
      transcodedAt,
      transcodingFailedAt,
    } = file;
    const completed = file.bytesCompleted === file.length;
    const transcoded = (file.transcoded || []).filter(f => f.type === 'media');

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
          {selectable && showSelect && (
            <span className={styles.fileSelect}>
              <CheckboxGroup
                id={file.id}
                onChange={this.toggleSelect}
                value={isSelected}
                type="checkbox"
              />
            </span>
          )}
          <span className={styles.fileIcon}>
            <ExtensionIcon ext={file.extension} />
          </span>
          <span className={styles.fileLabelSpan}>
            {completed ? <a href={file.url}>{file.basename}</a> : file.basename}
          </span>
          <FileDropdown
            onTranscode={
              onTranscode && transcodingQueuedAt ? this.onTranscode : undefined
            }
            onRemoveMetadata={
              onRemoveMetadata ? this.onRemoveMetadata : undefined
            }
            onChangeMovieMetadata={
              onChangeMovieMetadata ? this.onChangeMovieMetadata : undefined
            }
            onChangeTvMetadata={
              onChangeTvMetadata ? this.onChangeTvMetadata : undefined
            }
            transcoded={transcoded}
            toggleSelect={selectable ? this.toggleSelect : undefined}
            isSelected={isSelected}
            movieId={movieId}
            tvId={tvId}
          />
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
          {tvId && !hideInfo && (
            <Link href="/in/tv/[id]" as={`/in/tv/${tvId}`}>
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
          {transcoded.length > 0 && onPlay && !tvId && (
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
          {transcoded.length > 0 && onPlay && tvId && (
            <span className={styles.filePlay}>
              <Link
                passHref
                prefetch={false}
                href="/in/tv/[id]/[season]/[episode]"
                as={`/in/tv/${file.tvId}/${file.seasonNumber}/${file.episodeNumber}`}
              >
                <a className="btn btn-sm btn-outline-primary">
                  <Play className="mr-2" />
                  Play
                </a>
              </Link>
            </span>
          )}
          {transcodingQueuedAt && !transcodedAt && (
            <span className={styles.fileTranscodingStatus}>
              <TranscoderStatus
                id={file.id}
                status={file.transcodingStatus}
                finishedAt={transcodedAt}
                failedAt={transcodingFailedAt}
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
