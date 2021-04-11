import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ value, type, ...props }) => {
  const finalType = type.toLowerCase();
  return (
    <input
      type={finalType}
      {...(finalType === 'checkbox' ? { checked: !!value } : { value })}
      {...props}
    />
  );
};

Checkbox.propTypes = {
  input: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  type: PropTypes.string,
};

Checkbox.defaultProps = {
  type: 'checkbox',
};

export default Checkbox;
