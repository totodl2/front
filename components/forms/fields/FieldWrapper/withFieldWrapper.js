import React from 'react';
import FieldWrapperContainer from './FieldWrapperContainer';

const withFieldWrapper = (Component, defaultProps = {}) => props => (
  <FieldWrapperContainer
    controlComponent={Component}
    {...defaultProps}
    {...props}
  />
);

export default withFieldWrapper;
