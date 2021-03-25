import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import styles from './styles.module.scss';

class Input extends PureComponent {
  static propTypes = {
    valid: PropTypes.bool,
    invalid: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    type: PropTypes.string,
    innerRef: PropTypes.any,
    wrapperClassName: PropTypes.string,
  };

  onClear = evt => this.props.onClear(evt);

  render() {
    const {
      type,
      valid,
      invalid,
      className,
      innerRef,
      onClear,
      wrapperClassName,
      ...fwProps
    } = this.props;

    const input = (
      <input
        {...fwProps}
        ref={innerRef}
        type={type || 'text'}
        className={cl(className, 'form-control', {
          'is-valid': valid,
          'is-invalid': invalid,
          [styles.inputClearable]: onClear,
        })}
      />
    );

    if (!onClear) {
      return input;
    }

    const isClearable = onClear && !!fwProps.value;
    return (
      <div className={cl(styles.inputWrapper, wrapperClassName)}>
        {input}
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
}

export default React.forwardRef((props, ref) => (
  <Input {...props} innerRef={ref} />
));
