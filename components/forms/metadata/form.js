import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { ReactComponent as Search } from 'feather-icons/dist/icons/search.svg';
import cl from 'classnames';

import scrollToInvalidField from '../../../lib/dom/scrollToInvalidField';
import NAME from './name';
import Input from '../fields/Input';
import { validateRequired } from '../../../lib/validators';
import FormGlobalErrors from '../fields/FormGlobalErrors';
import FieldWrapper from '../fields/FieldWrapper/FieldWrapper';

class Metadata extends PureComponent {
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
        <div>
          <Field
            component={Input}
            placeholder="Rambo V"
            label="Media's name"
            name="query"
            type="text"
            validate={validateRequired}
          >
            {({
              form: { component: Component, componentProps, ...form },
              ...props
            }) => (
              <FieldWrapper
                {...props}
                form={{
                  ...form,
                  className: 'input-group',
                  children: (
                    <>
                      <Component
                        {...componentProps}
                        className={cl(componentProps.className, 'form-yolo')}
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-primary">
                          <Search className="mr-2" />
                          Search
                        </button>
                      </div>
                    </>
                  ),
                }}
              />
            )}
          </Field>
        </div>
        <FormGlobalErrors className="mt-3" errors={error} />
      </form>
    );
  }
}

export default reduxForm({
  form: NAME,
  onSubmitFail: scrollToInvalidField(NAME),
})(Metadata);
