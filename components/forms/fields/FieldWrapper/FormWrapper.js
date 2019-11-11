import React from 'react';
import PropTypes from 'prop-types';

const FormWrapper = ({ className, children }) => (
  <div className={className}>{children}</div>
);

FormWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default FormWrapper;
