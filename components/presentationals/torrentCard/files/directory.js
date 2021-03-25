import React from 'react';
import { Folder, FolderMinus, FolderPlus, Copy } from 'react-feather';
import { VelocityTransitionGroup } from 'velocity-react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import cl from 'classnames';
import flatten from 'lodash/flattenDeep';

import ToggleContainer from '../../../containers/ToggleContainer';
import { FILES_KEY, MAX_FILES_TO_DEFAULT_OPEN } from './constants';
import { sortDirAlpha, sortFilesAlpha } from './utils';
import File from './file';

import styles from './directory.module.scss';
import CopyButton from '../../copyButton';

const flattenFiles = files =>
  flatten(
    Object.entries(files).map(([childName, value]) => {
      if (childName === FILES_KEY) {
        return value.map(f => f.url);
      }
      return flattenFiles(value);
    }),
  ).filter(Boolean);

export const Directory = ({
  files,
  name,
  className,
  isOpen,
  toggle,
  onPlayFile,
  onChangeMetadata,
  onRemoveMetadata,
  onTranscode,
}) => {
  const filesList = get(files, FILES_KEY, []);
  const directories = Object.entries(files);
  filesList.sort(sortFilesAlpha);
  directories.sort(sortDirAlpha);

  return (
    <div className={className}>
      {name && (
        <div
          className={cl(styles.directory, {
            [styles.directoryInteractive]: !!toggle,
          })}
          onClick={toggle}
        >
          <div className={cl(styles.directoryIcon, 'mr-1"')}>
            {toggle && isOpen && <FolderMinus />}
            {toggle && !isOpen && <FolderPlus />}
            {!toggle && <Folder />}
          </div>
          <div className={styles.directoryLabel}>{name}</div>
          <div className={styles.directoryCopyBtn}>
            <CopyButton
              tag="button"
              type="button"
              copy={flattenFiles(files).join('\n')}
              className="btn btn-sm btn-outline-dark"
            >
              <Copy className="mr-1" />
              Copy links
            </CopyButton>
          </div>
        </div>
      )}
      <VelocityTransitionGroup
        enter={{ animation: 'slideDown', duration: 200 }}
        leave={{ animation: 'slideUp', duration: 200 }}
      >
        {(isOpen || !toggle) && (
          <div
            className={cl(styles.directories, {
              [styles.directoriesHasName]: !!name,
            })}
          >
            {directories.map(([childName, value]) => {
              if (childName === FILES_KEY) {
                return null;
              }

              const childFiles = get(value, FILES_KEY, []);
              const count = childFiles.length + Object.entries(value).length;
              return (
                <ToggleDirectory
                  key={childName}
                  name={childName}
                  files={value}
                  onPlayFile={onPlayFile}
                  defaultOpened={count < MAX_FILES_TO_DEFAULT_OPEN}
                  onChangeMetadata={onChangeMetadata}
                  onRemoveMetadata={onRemoveMetadata}
                  onTranscode={onTranscode}
                />
              );
            })}
            {filesList.length > 0 && (
              <div className={styles.files}>
                {filesList.map(file => (
                  <File
                    key={file.id}
                    file={file}
                    onPlay={onPlayFile}
                    onChangeMetadata={onChangeMetadata}
                    onRemoveMetadata={onRemoveMetadata}
                    onTranscode={onTranscode}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </VelocityTransitionGroup>
    </div>
  );
};

const ToggleDirectory = ({ ...props }) => (
  <ToggleContainer view={Directory} {...props} />
);

Directory.propTypes = {
  files: PropTypes.object,
  name: PropTypes.string,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  onPlayFile: PropTypes.func,
  onChangeMetadata: PropTypes.func,
  onRemoveMetadata: PropTypes.func,
  onTranscode: PropTypes.func,
};

export default ToggleDirectory;
