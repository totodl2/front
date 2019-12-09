import React, { PureComponent } from 'react';
import { fieldMetaPropTypes, fieldInputPropTypes } from 'redux-form';
import PropTypes from 'prop-types';
import cl from 'classnames';

import styles from './styles.module.scss';

const defaultClearValue = evt => {
  // eslint-disable-next-line no-param-reassign
  evt.target.value = '';
};

class Input extends PureComponent {
  static propTypes = {
    meta: PropTypes.shape(fieldMetaPropTypes),
    input: PropTypes.shape(fieldInputPropTypes),
    type: PropTypes.string,
    onChange: PropTypes.func,
    clearable: PropTypes.bool,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
  };

  onClear = evt => {
    const { input: { onChange: inputOnChange } = {}, onChange } = this.props;
    return (inputOnChange || onChange || defaultClearValue)(evt);
  };

  render() {
    const {
      input = {},
      type,
      meta,
      clearable,
      className,
      inputClassName,
      ...props
    } = this.props;
    const finalInputProps = {
      ...input,
      ...props,
    };

    const isClearable = clearable && !!finalInputProps.value;

    const inputEl = (
      <input
        type="text"
        {...finalInputProps}
        value={finalInputProps.value || ''}
        className={cl('form-control', inputClassName, {
          [styles.inputClearable]: isClearable,
          [className]: !clearable,
        })}
      />
    );

    if (clearable) {
      return (
        <div className={cl(styles.inputWrapper, className)}>
          {inputEl}
          {isClearable && (
            <div
              className={cl('disable-selection', styles.inputWrapperClearer)}
              onClick={this.onClear}
            >
              &times;
            </div>
          )}
        </div>
      );
    }

    return inputEl;
  }
}

export default Input;
