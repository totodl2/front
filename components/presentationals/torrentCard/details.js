import React from 'react';
import PropTypes from 'prop-types';
import { ChevronUp } from 'react-feather';
import cl from 'classnames';

import { FILES_KEY, MAX_FILES_TO_DEFAULT_OPEN } from './files/constants';
import ToggleDirectory from './files/directory';

import styles from './details.module.scss';

const Details = ({ files, toggle, className }) => (
  <div className={className}>
    <h6>Files</h6>
    <ToggleDirectory
      files={files}
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
};

export default Details;
