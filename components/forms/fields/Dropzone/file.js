import React from 'react';
import { fieldPropTypes } from 'redux-form';
import { X } from 'react-feather';
import cl from 'classnames';

import withFieldWrapper from '../FieldWrapper/withFieldWrapper';
import PrettyBytes from '../../../presentationals/prettyBytes';

import styles from './file.module.scss';

const File = ({ input, className, onRemove }) => (
  <div className={className}>
    <a
      href="javascript:" // eslint-disable-line
      title="Remove"
      onClick={onRemove}
      className={styles.fileRemove}
    >
      <X />
    </a>
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