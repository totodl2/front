import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import getId from '../utils/getId';
import isValid from '../utils/isValid';
import isInvalid from '../utils/isInvalid';
import DefaultLabel from '../Label';
import DefaultInput from '../Input';
import InvalidFeedback from '../InvalidFeedback';
import { Loader } from '../../../presentationals/loader';

import styles from './index.module.scss';

const defaultEmptyObject = {};
class FieldWrapper extends PureComponent {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    children: PropTypes.func,
    fieldClassName: PropTypes.string,
    controlComponent: PropTypes.any,
    labelComponent: PropTypes.any,
    render: PropTypes.func,
    renderLabel: PropTypes.func,
    renderControl: PropTypes.func,
    renderFeedback: PropTypes.func,
    renderLoader: PropTypes.func,
    loading: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  };

  componentWillUnmount() {
    console.log('NTM ', this.props);
  }

  processProps = () => {
    const {
      children,
      render,
      renderControl,
      renderFeedback,
      renderLabel,
      fieldClassName,
      labelComponent: Label = DefaultLabel,
      controlComponent: Control = DefaultInput,
      ...props
    } = this.props;
    const id =
      props.meta && props.input ? getId(props.meta, props.input) : undefined;
    const valid = props.meta && isValid(props.meta);
    const invalid = props.meta && isInvalid(props.meta);

    return {
      id,
      valid,
      invalid,
      Label,
      Control,
      ...props,
    };
  };

  renderLabel = ({ Label, id, label }) =>
    label ? <Label htmlFor={id}>{label}</Label> : null;

  renderControl = ({
    id,
    valid,
    invalid,
    input,
    Control,
    loading,
    meta,
    Label,
    label,
    ...props
  }) => (
    <Control id={id} valid={valid} invalid={invalid} {...input} {...props} />
  );

  renderFeedback = ({ meta }) => (
    <InvalidFeedback meta={meta || defaultEmptyObject} />
  );

  renderLoader = ({ loading }) => <Loader size="sm" visible={loading} />;

  defaultRender = ({
    props,
    renderLabel,
    renderControl,
    renderFeedback,
    renderLoader,
    fieldClassName,
  }) => (
    <div className={cl(styles.field, fieldClassName)}>
      {renderLabel(props)}
      {renderControl(props)}
      {renderFeedback(props)}
      {renderLoader(props)}
    </div>
  );

  render() {
    const {
      children,
      render,
      renderControl,
      renderFeedback,
      renderLabel,
      renderLoader,
      fieldClassName,
    } = this.props;
    const props = this.processProps();
    return (render || children || this.defaultRender)({
      props,
      fieldClassName,
      renderLabel: renderLabel || this.renderLabel,
      renderControl: renderControl || this.renderControl,
      renderFeedback: renderFeedback || this.renderFeedback,
      renderLoader: renderLoader || this.renderLoader,
    });
  }
}

export default FieldWrapper;
