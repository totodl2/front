import React from 'react';
import PropTypes from 'prop-types';
import classes from './Label.module.scss';

const Label = ({ className, optional, label, htmlFor, children }) => (
  <div className={className}>
    <div className={classes.labelWrapper}>
      <label htmlFor={htmlFor}>{label}</label>
      {optional && <small>* optionnel</small>}
      {children}
    </div>
  </div>
);

Label.propTypes = {
  className: PropTypes.string,
  optional: PropTypes.bool,
  label: PropTypes.node,
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};

export default Label;
