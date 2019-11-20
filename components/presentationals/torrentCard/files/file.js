import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import ExtensionIcon from './extensionIcon';

import styles from './file.module.scss';
import PrettyBytes from '../../prettyBytes';

const File = ({ file, className }) => {
  const completed = file.bytesCompleted === file.length;
  return (
    <a href="#" target="_blank" className={cl(className, styles.file)}>
      {!completed && (
        <div
          className={styles.fileProgress}
          style={{
            right: `${100 -
              Math.round((file.bytesCompleted / file.length) * 10000) / 100}%`,
          }}
        />
      )}
      <div className={styles.fileIcon}>
        <ExtensionIcon ext={file.extension} />
      </div>
      <div className={styles.fileLabel}>{file.basename}</div>
      <div className="ml-auto pl-3">
        <PrettyBytes bytes={file.length} />
      </div>
    </a>
  );
};

File.propTypes = {
  file: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default File;
