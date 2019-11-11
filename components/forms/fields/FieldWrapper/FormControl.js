import React from 'react';
import PropTypes from 'prop-types';
import { VisibleContainerLoader } from '../../../presentationals/loader';
import classes from './FormControl.module.scss';

const FormControl = ({
  className,
  component: Component,
  componentProps,
  isLoading,
  children,
}) => (
  <div className={className}>
    {!children && <Component {...componentProps} />}
    {children}
    {isLoading && (
      <VisibleContainerLoader size="sm" className={classes.loader} />
    )}
  </div>
);

FormControl.propTypes = {
  className: PropTypes.string,
  component: PropTypes.func,
  componentProps: PropTypes.object,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  isInvalid: PropTypes.bool, // eslint-disable-line
};

FormControl.defaultProps = {
  componentProps: {},
};

export default FormControl;
