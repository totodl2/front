import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import { validateRequired } from '../../../lib/validators';
import FormGlobalErrors from '../fields/FormGlobalErrors';
import FieldWrapper from '../fields/FieldWrapper';
import withContainer from '../../../lib/withContainer';
import Input from '../fields/Input';
import composeValidators from '../utils/composeValidators';
import validateNumber from '../../../lib/validators/validateNumber';

const numberValidators = composeValidators(validateRequired, validateNumber);

class EpisodesMetadataForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    error: PropTypes.any,
    submitError: PropTypes.any,
    children: PropTypes.func,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        basename: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  renderFormContent() {
    const { submitError, error, files } = this.props;

    return (
      <>
        {files.map(file => (
          <div className="row align-items-center" key={file.id}>
            <div className="col-md-6">
              <b>{file.basename}</b>
            </div>
            <div className="col-md-3">
              <Field
                component={FieldWrapper}
                controlComponent={Input}
                type="number"
                label="Season number"
                name={`${file.id}.seasonNumber`}
                validate={numberValidators}
              />
            </div>
            <div className="col-md-3">
              <Field
                component={FieldWrapper}
                controlComponent={Input}
                type="number"
                label="Episode number"
                name={`${file.id}.episodeNumber`}
                validate={numberValidators}
              />
            </div>
          </div>
        ))}
        <input type="submit" className="d-none" />
        <FormGlobalErrors className="mb-4" errors={error || submitError} />
      </>
    );
  }

  render() {
    const { handleSubmit, children, className, ...props } = this.props;
    const formContent = this.renderFormContent();
    return (
      <form onSubmit={handleSubmit} className={className} autoComplete="off">
        {children ? children({ form: formContent, props }) : formContent}
      </form>
    );
  }
}

export default withContainer(Form, null, 'component')(EpisodesMetadataForm);
