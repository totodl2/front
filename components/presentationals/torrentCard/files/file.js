import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import ExtensionIcon from './extensionIcon';

import styles from './file.module.scss';
import PrettyBytes from '../../prettyBytes';

const File = ({ file, className }) => {
  const completed = file.bytesCompleted === file.length;
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
        <span className={styles.fileLabelSpan}>{file.basename}</span>
        <span className={styles.fileSize}>
          {!completed && (
            <>
              <PrettyBytes bytes={file.bytesCompleted} /> /
            </>
          )}
          <PrettyBytes bytes={file.length} />
        </span>
      </div>
      <div className="clearfix" />
    </>
  );

  if (completed) {
    return (
      <a href={file.url} target="_blank" className={cl(className, styles.file)}>
        {content}
      </a>
    );
  }
  return <div className={cl(className, styles.file)}>{content}</div>;
};

File.propTypes = {
  file: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default File;
