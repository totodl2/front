import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ChevronUp } from 'feather-icons/dist/icons/chevron-up.svg';

import cl from 'classnames';

import { FILES_KEY, MAX_FILES_TO_DEFAULT_OPEN } from './files/constants';
import ToggleDirectory from './files/directory';

import styles from './details.module.scss';

const Details = ({
  files,
  toggle,
  className,
  onPlayFile,
  onChangeMetadata,
  onRemoveMetadata,
  onTranscode,
}) => (
  <div className={className}>
    <h6>Files</h6>
    <ToggleDirectory
      files={files}
      onPlayFile={onPlayFile}
      onChangeMetadata={onChangeMetadata}
      onRemoveMetadata={onRemoveMetadata}
      onTranscode={onTranscode}
      defaultOpened={
        !files[FILES_KEY] || files[FILES_KEY].length < MAX_FILES_TO_DEFAULT_OPEN
      }
    />
    <div
      className={cl('w-100 py-2 text-center', styles.defailsToggle)}
      onClick={toggle}
    >
      <ChevronUp />
    </div>
  </div>
);

Details.propTypes = {
  toggle: PropTypes.func.isRequired,
  files: PropTypes.object,
  className: PropTypes.string,
  onPlayFile: PropTypes.func,
  onChangeMetadata: PropTypes.func,
  onRemoveMetadata: PropTypes.func,
  onTranscode: PropTypes.func,
};

export default Details;
