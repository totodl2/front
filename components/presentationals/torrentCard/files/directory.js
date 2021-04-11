import React from 'react';
import { ReactComponent as Folder } from 'feather-icons/dist/icons/folder.svg';
import { ReactComponent as FolderMinus } from 'feather-icons/dist/icons/folder-minus.svg';
import { ReactComponent as FolderPlus } from 'feather-icons/dist/icons/folder-plus.svg';
import { ReactComponent as Copy } from 'feather-icons/dist/icons/copy.svg';

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
  onChangeMovieMetadata,
  onChangeTvMetadata,
  onRemoveMetadata,
  onTranscode,
  selected,
  selectable,
  onSelect,
  onUnSelect,
  isSelected,
  showSelect,
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
                  onChangeMovieMetadata={onChangeMovieMetadata}
                  onChangeTvMetadata={onChangeTvMetadata}
                  onRemoveMetadata={onRemoveMetadata}
                  onTranscode={onTranscode}
                  selected={selected}
                  selectable={selectable}
                  onSelect={onSelect}
                  onUnSelect={onUnSelect}
                  isSelected={isSelected}
                  showSelect={showSelect}
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
                    onChangeMovieMetadata={onChangeMovieMetadata}
                    onChangeTvMetadata={onChangeTvMetadata}
                    onRemoveMetadata={onRemoveMetadata}
                    onTranscode={onTranscode}
                    selectable={selectable}
                    isSelected={selectable && isSelected(file, selected)}
                    onSelect={onSelect}
                    onUnSelect={onUnSelect}
                    showSelect={showSelect}
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
  onChangeMovieMetadata: PropTypes.func,
  onChangeTvMetadata: PropTypes.func,
  onRemoveMetadata: PropTypes.func,
  onTranscode: PropTypes.func,
  selectable: PropTypes.bool,
  selected: PropTypes.array,
  onSelect: PropTypes.func,
  onUnSelect: PropTypes.func,
  isSelected: PropTypes.func,
  showSelect: PropTypes.bool,
};

export default ToggleDirectory;
