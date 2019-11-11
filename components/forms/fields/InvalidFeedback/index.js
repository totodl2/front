import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export const InvalidFeedback = ({ meta }) => {
  const isInvalid =
    (meta.touched || !meta.pristine || meta.submitFailed) &&
    meta.invalid &&
    meta.error;

  return (
    <div
      className={`invalid-feedback ${
        isInvalid ? 'invalid-feedback--visible' : 'invalid-feedback--hidden'
      }`}
    >
      {Array.isArray(meta.error) ? (
        meta.error.map((e, key) => <div key={key.toString()}>{e}</div>)
      ) : (
        <div>
          {typeof meta.error === 'object'
            ? Object.values(meta.error).join(', ')
            : meta.error}
        </div>
      )}
    </div>
  );
};

InvalidFeedback.propTypes = {
  meta: PropTypes.object.isRequired,
};

export default InvalidFeedback;
