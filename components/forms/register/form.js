import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import scrollToInvalidField from '../../../lib/dom/scrollToInvalidField';
import NAME from './name';
import Input from '../fields/Input';
import {
  validateEmail,
  validateRequired,
  validatePassword,
} from '../../../lib/validators';
import FormGlobalErrors from '../fields/FormGlobalErrors';

class Register extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    error: PropTypes.any,
  };

  render() {
    const { className, handleSubmit, error } = this.props;

    return (
      <form
        id={NAME}
        className={className}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Field
          component={Input}
          placeholder="john@doe.com"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          validate={[validateEmail, validateRequired]}
        />
        <Field
          component={Input}
          placeholder="John"
          label="Nickname"
          name="nickname"
          autoComplete="username"
          validate={[validateRequired]}
        />
        <Field
          component={Input}
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          validate={[validatePassword, validateRequired]}
        />
        <input type="submit" className="d-none" />
        <FormGlobalErrors className="mt-3" errors={error} />
      </form>
    );
  }
}

export default reduxForm({
  form: NAME,
  onSubmitFail: scrollToInvalidField(NAME),
})(Register);
