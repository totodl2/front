import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import { validateRequired } from '../../../lib/validators';
import FormGlobalErrors from '../fields/FormGlobalErrors';
import FieldWrapper from '../fields/FieldWrapper';
import withContainer from '../../../lib/withContainer';
import SearchInput from './searchInput';

class Metadata extends PureComponent {
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
        <div>
          <Field
            component={FieldWrapper}
            controlComponent={SearchInput}
            placeholder="Rambo V"
            label="Media's name"
            name="query"
            type="text"
            validate={validateRequired}
          />
        </div>
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

export default withContainer(Form, null, 'component')(Metadata);
