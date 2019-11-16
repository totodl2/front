import React, { PureComponent } from 'react';
import { fieldPropTypes } from 'redux-form';
import PropTypes from 'prop-types';
import cl from 'classnames';
import sanitize from '../../utils/sanitizeId';
import FieldWrapper from './FieldWrapper';

const map = {};

function generateNew(formName, name, iteration = 0) {
  const newId = `${sanitize(formName)}-${sanitize(name)}-wrapped-${iteration}`;
  const found = map[newId];
  if (found) {
    return generateNew(formName, name, ++iteration); // eslint-disable-line
  }
  map[newId] = true;
  return newId;
}

function getId(id, formName, name) {
  if (id) {
    return id;
  }
  return generateNew(formName, name, 0);
}

function removeId(id) {
  if (map[id]) {
    delete map[id];
  }
}

/**
 * Check if field is Valid
 * @param meta
 * @returns {*|boolean}
 */
function isValid(meta) {
  const isActive = meta.touched || !meta.pristine || meta.submitFailed;
  return isActive ? meta.valid : undefined;
}

/**
 * Check if field is Invalid
 * @param meta
 * @returns {*|boolean}
 */
function isInvalid(meta) {
  const isActive = meta.touched || !meta.pristine || meta.submitFailed;
  return isActive ? meta.invalid : undefined;
}

const getClassNames = (className, meta) =>
  cl(className, {
    'is-valid': isValid(meta),
    'is-invalid': isInvalid(meta),
  });

class FieldWrapperContainer extends PureComponent {
  static propTypes = {
    ...fieldPropTypes,
    id: PropTypes.string, // eslint-disable-line
    className: PropTypes.string,
    label: PropTypes.string,
    htmlLabel: PropTypes.string,
    controlComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    optional: PropTypes.bool,
    render: PropTypes.func,
    isLoading: PropTypes.bool,
    children: PropTypes.func,
  };

  static defaultProps = {
    optional: false,
  };

  static getDerivedStateFromProps(props, state) {
    const newState = { ...state };

    if (((props.meta.form && props.input.name) || props.id) && !state.id) {
      const newId = getId(props.id, props.meta.form, props.input.name);
      if (newId !== state.id) {
        newState.id = newId;
        return newState;
      }
    }

    return null;
  }

  state = {
    id: null,
  };

  componentWillUnmount() {
    removeId(this.state.id);
  }

  renderFieldWrapper = props => <FieldWrapper {...props} />;

  processLabel = () => {
    const { label, htmlLabel } = this.props;
    if (label) {
      return label;
    }
    return <span dangerouslySetInnerHTML={{ __html: htmlLabel }} />;
  };

  render() {
    const {
      id,
      className,
      label,
      htmlLabel,
      controlComponent,
      render,
      isLoading,
      meta,
      input,
      optional,
      children,
      ...props
    } = this.props;

    return (render || children || this.renderFieldWrapper)({
      label: {
        label: this.processLabel(),
        htmlFor: this.state.id,
        optional,
        isValid: isValid(meta),
        isInvalid: isInvalid(meta),
      },
      form: {
        isLoading,
        component: controlComponent,
        componentProps: {
          ...props,
          input,
          meta,
          id: this.state.id,
          className: getClassNames(className, meta),
        },
      },
      feedback: { meta },
    });
  }
}

export default FieldWrapperContainer;
