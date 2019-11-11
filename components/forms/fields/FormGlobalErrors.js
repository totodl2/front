import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

const FormGlobalErrors = ({ errors, className }) => {
  let out = null;
  if (Array.isArray(errors)) {
    out = (
      <ul className="mb-0">
        {errors.map((e, key) => (
          <li key={key.toString()}>{e}</li>
        ))}
      </ul>
    );
  } else if (errors && typeof errors === 'object') {
    out = (
      <ul className="mb-0">
        {Object.keys(errors).map((key, i) => (
          <li key={i.toString()}>{errors[key]}</li>
        ))}
      </ul>
    );
  } else if (errors) {
    out = <div>{errors}</div>;
  }

  if (!out) {
    return null;
  }

  return (
    <div className={cl('alert alert-danger fade show mb-3', className)}>
      {out}
    </div>
  );
};

FormGlobalErrors.propTypes = {
  className: PropTypes.string,
  errors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
};

export default FormGlobalErrors;
