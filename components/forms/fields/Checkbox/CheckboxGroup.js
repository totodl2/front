import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import Checkbox from './Checkbox';

const CheckboxGroup = ({ className, label, id, type, ...props }) => (
  <div
    className={cl('custom-control', className, {
      'custom-checkbox': type.toLowerCase() === 'checkbox',
      'custom-radio': type.toLowerCase() === 'radio',
    })}
  >
    <Checkbox id={id} type={type} className="custom-control-input" {...props} />
    <label
      className={cl('my-0 custom-control-label', { 'ml-2': !!label })}
      htmlFor={id}
    >
      {label}
    </label>
  </div>
);

CheckboxGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['checkbox', 'radio']),
};

CheckboxGroup.defaultProps = {
  type: 'checkbox',
};

export default CheckboxGroup;
