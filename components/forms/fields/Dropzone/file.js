import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as X } from 'feather-icons/dist/icons/x.svg';
import cl from 'classnames';

import PrettyBytes from '../../../presentationals/prettyBytes';

import styles from './file.module.scss';

const File = ({ value, className, onRemove }) => (
  <div className={className}>
    <button
      type="button" // eslint-disable-line
      title="Remove"
      onClick={onRemove}
      className={cl(styles.fileRemove, 'btn btn-link')}
    >
      <X />
    </button>
    <span className={cl('align-middle', styles.fileName)}>{value.name}</span>
    <span className="align-middle text-muted">
      &nbsp;-&nbsp;
      <PrettyBytes bytes={value.size} />
    </span>
  </div>
);

File.propTypes = {
  value: PropTypes.object,
  className: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
};

export default File;
