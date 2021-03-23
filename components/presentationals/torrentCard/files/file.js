import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { Play, Info } from 'react-feather';
import Link from 'next/link';

import ExtensionIcon from './extensionIcon';

import styles from './file.module.scss';
import PrettyBytes from '../../prettyBytes';
import TranscoderStatus from './transcoderStatus';

const File = ({ file, className, onPlay, hideInfo }) => {
  const { movieId, transcodingQueuedAt, transcodedAt } = file;
  const completed = file.bytesCompleted === file.length;
  const transcoded = (file.transcoded || []).filter(f => f.type === 'media');

  const content = (
    <>
      {!completed && (
        <div
          className={styles.fileProgress}
          style={{
            right: `${100 -
              Math.round((file.bytesCompleted / file.length) * 10000) / 100}%`,
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
        <span className={styles.fileSize}>
          {!completed && (
            <>
              <PrettyBytes bytes={file.bytesCompleted} /> /
            </>
          )}
          <PrettyBytes bytes={file.length} />
        </span>
        {transcoded.length > 0 && (
          <span className={styles.fileTranscoded}>
            {transcoded.map(media => (
              <a
                href={media.url}
                key={media.preset}
                className="btn btn-sm btn-outline-primary"
              >
                {media.preset}
              </a>
            ))}
          </span>
        )}
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
};

File.propTypes = {
  file: PropTypes.object.isRequired,
  className: PropTypes.string,
  onPlay: PropTypes.func,
  hideInfo: PropTypes.bool,
};

export default File;
