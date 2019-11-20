import React from 'react';
import PropTypes from 'prop-types';
import { ChevronUp } from 'react-feather';

import { FILES_KEY, MAX_FILES_TO_DEFAULT_OPEN } from './files/constants';
import ToggleDirectory from './files/directory';

const Details = ({ files, toggle, className }) => (
  <div className={className}>
    <h6>Files</h6>
    <ToggleDirectory
      files={files}
      defaultOpened={
        !files[FILES_KEY] || files[FILES_KEY].length < MAX_FILES_TO_DEFAULT_OPEN
      }
    />
    <div className="w-100 my-2 text-center" onClick={toggle}>
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
