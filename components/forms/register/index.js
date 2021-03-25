import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import Input from '../fields/Input';
import {
  validateRequired,
  validateEmail as emailValidator,
  validatePassword as passwordValidator,
} from '../../../lib/validators';
import FormErrors from '../fields/FormErrors';
import composeValidators from '../utils/composeValidators';
import withContainer from '../../../lib/withContainer';
import FieldWrapper from '../fields/FieldWrapper';

const validateEmail = composeValidators(validateRequired, emailValidator);
const validatePassword = composeValidators(validateRequired, passwordValidator);

class Register extends PureComponent {
  static propTypes = {
    children: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    error: PropTypes.any,
    submitError: PropTypes.any,
  };

  renderFormContent() {
    const { error, submitError } = this.props;

    return (
      <>
        <Field
          component={FieldWrapper}
          controlComponent={Input}
          placeholder="john@doe.com"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          validate={validateEmail}
        />
        <Field
          component={FieldWrapper}
          controlComponent={Input}
          placeholder="John"
          label="Nickname"
          name="nickname"
          autoComplete="nickname"
          validate={validateRequired}
        />
        <Field
          component={FieldWrapper}
          controlComponent={Input}
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          validate={validatePassword}
        />
        <input type="submit" className="d-none" />
        <FormErrors className="mb-4" errors={error || submitError} />
      </>
    );
  }

  render() {
    const { handleSubmit, children, className, ...props } = this.props;
    const formContent = this.renderFormContent();
    return (
      <form onSubmit={handleSubmit} className={className}>
        {children ? children({ form: formContent, props }) : formContent}
      </form>
    );
  }
}

export default withContainer(Form, null, 'component')(Register);
