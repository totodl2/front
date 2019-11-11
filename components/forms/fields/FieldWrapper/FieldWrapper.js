import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import FormControl from './FormControl';
import Label from './Label';
import Feedback from './Feedback';

export const propTypes = {
  className: PropTypes.string,
  label: PropTypes.object,
  form: PropTypes.object,
  feedback: PropTypes.object,
  children: PropTypes.node,
};

const FieldWrapper = ({ className, label, form, feedback, children }) => (
  <div className={cl(className, 'form-group', 'field-wrapper')}>
    {!children ? (
      <>
        <Label {...label} />
        <FormControl {...form} />
        <Feedback {...feedback} />
      </>
    ) : (
      children
    )}
  </div>
);

FieldWrapper.propTypes = propTypes;

export default FieldWrapper;
