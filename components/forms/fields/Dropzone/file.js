import React from 'react';
import { fieldPropTypes } from 'redux-form';
import { ReactComponent as X } from 'feather-icons/dist/icons/x.svg';
import cl from 'classnames';

import withFieldWrapper from '../FieldWrapper/withFieldWrapper';
import PrettyBytes from '../../../presentationals/prettyBytes';

import styles from './file.module.scss';

const File = ({ input, className, onRemove }) => (
  <div className={className}>
    <button
      type="button" // eslint-disable-line
      title="Remove"
      onClick={onRemove}
      className={cl(styles.fileRemove, 'btn btn-link')}
    >
      <X />
    </button>
    <span className={cl('align-middle', styles.fileName)}>
      {input.value.name}
    </span>
    <span className="align-middle text-muted">
      &nbsp;-&nbsp;
      <PrettyBytes bytes={input.value.size} />
    </span>
  </div>
);

File.propTypes = fieldPropTypes;

export const FileWrapped = withFieldWrapper(File);

export default File;
