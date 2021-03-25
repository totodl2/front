import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import Input from '../fields/Input';
import {
  validateEmail as emailValidator,
  validateRequired as requiredValidator,
  validatePassword as passwordValidator,
} from '../../../lib/validators';
import FieldWrapper from '../fields/FieldWrapper';
import FormErrors from '../fields/FormErrors';
import withContainer from '../../../lib/withContainer';
import composeValidators from '../utils/composeValidators';

const validateEmail = composeValidators(requiredValidator, emailValidator);
const validatePassword = composeValidators(
  requiredValidator,
  passwordValidator,
);

class Login extends PureComponent {
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
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
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

export default withContainer(Form, null, 'component')(Login);
