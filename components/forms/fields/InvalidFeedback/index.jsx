import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import styles from './index.module.scss';
import isInvalid from '../utils/isInvalid';
import { renderErrors } from './utils';

const InvalidFeedback = ({ meta }) => {
  const invalid = isInvalid(meta);
  return (
    <div
      className={cl('invalid-feedback', styles.invalidFeedback, {
        [styles.invalidFeedbackVisible]:
          invalid && (meta.error || meta.submitError),
        [styles.invalidFeedbackHidden]: !isInvalid(meta),
      })}
    >
      {invalid && meta.error && renderErrors(meta.error)}
      {invalid &&
        meta.submitError &&
        !meta.modifiedSinceLastSubmit &&
        renderErrors(meta.submitError)}
    </div>
  );
};

InvalidFeedback.propTypes = {
  meta: PropTypes.object.isRequired,
};

export default InvalidFeedback;
