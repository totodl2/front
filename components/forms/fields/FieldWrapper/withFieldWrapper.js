import React from 'react';
import FieldWrapperContainer from './index';

const withFieldWrapper = (Component, defaultProps = {}) => props => (
  <FieldWrapperContainer
    controlComponent={Component}
    {...defaultProps}
    {...props}
  />
);

export default withFieldWrapper;
