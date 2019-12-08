import React from 'react';
import { fieldPropTypes } from 'redux-form';
import PropTypes from 'prop-types';
import cl from 'classnames';

const Input = ({ input = {}, meta, className, ...props }) => (
  <input
    type="text"
    {...input}
    {...props}
    className={cl(className, 'form-control')}
  />
);
Input.propTypes = {
  ...fieldPropTypes,
  className: PropTypes.string,
};

export default Input;
