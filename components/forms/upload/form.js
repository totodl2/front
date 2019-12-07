import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, FieldArray } from 'redux-form';
import scrollToInvalidField from '../../../lib/dom/scrollToInvalidField';
import NAME from './name';
import Input from '../fields/Input';
import Dropzone from '../fields/Dropzone';
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
          placeholder="magnet:?"
          label="Magnet link"
          name="magnet"
          type="text"
          autoComplete="off"
        />
        <FieldArray
          component={Dropzone}
          fileLabel="Torrent"
          label="Files"
          name="files"
          accept=".torrent"
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
