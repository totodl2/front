import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import arrayMutators from '@incoqnito.io/final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import Input from '../fields/Input';
import Dropzone from '../fields/Dropzone';
import FormGlobalErrors from '../fields/FormGlobalErrors';
import withContainer from '../../../lib/withContainer';
import FieldWrapper from '../fields/FieldWrapper';

const noop = () => null;

class Register extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    error: PropTypes.any,
    submitError: PropTypes.any,
    children: PropTypes.func,
  };

  renderFormContent() {
    const { submitError, error } = this.props;
    return (
      <>
        <Field
          component={FieldWrapper}
          controlComponent={Input}
          placeholder="magnet:?"
          label="Magnet link"
          name="magnet"
          type="text"
          autoComplete="off"
        />
        <FieldArray
          component={FieldWrapper}
          controlComponent={Dropzone}
          fileLabel="Torrent"
          label="Files"
          name="files"
          accept=".torrent"
          renderFeedback={noop}
        />
        <input type="submit" className="d-none" />
        <FormGlobalErrors className="mb-4" errors={error || submitError} />
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

export default withContainer(
  Form,
  () => ({ mutators: arrayMutators }),
  'component',
)(Register);
