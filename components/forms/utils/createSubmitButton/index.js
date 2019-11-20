import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import cl from 'classnames';
import get from 'lodash/get';

import styles from './style.module.scss';
import { Loader } from '../../../presentationals/loader';

const noop = () => {};
export default function(formName) {
  const HOC = class extends Component {
    static displayName = `submitButton(${formName})`;

    static propTypes = {
      form: PropTypes.shape({
        submitting: PropTypes.bool,
        triggerSubmit: PropTypes.bool,
      }),
      className: PropTypes.string,
      onClick: PropTypes.func,
      dispatch: PropTypes.func.isRequired,
      children: PropTypes.node,
      tag: PropTypes.any,
      loaderColor: PropTypes.string,
    };

    static defaultProps = {
      tag: 'button',
    };

    onClick = evt => {
      if (
        get(this.props.form, 'submitting') ||
        get(this.props.form, 'triggerSubmit')
      ) {
        evt.preventDefault();
        return;
      }

      if (this.props.onClick) {
        this.props.onClick(evt);
      }

      if (!evt.defaultPrevented) {
        this.props.dispatch(submit(formName));
        evt.preventDefault();
      }
    };

    render() {
      const {
        tag: Tag,
        onClick,
        dispatch,
        form = {},
        loaderColor,
        className,
        ...props
      } = this.props;
      const disabled = !!(form.submitting || form.triggerSubmit);
      const displayLoader = loaderColor && disabled;
      return (
        <Tag
          {...props}
          disabled={disabled && !loaderColor}
          type={Tag === 'button' ? 'button' : undefined}
          onClick={disabled ? noop : this.onClick}
          className={cl(className, { [styles.goUp]: displayLoader })}
        >
          {!displayLoader && this.props.children}
          {displayLoader && (
            <div className="d-flex">
              <div>{this.props.children}</div>
              <Loader
                className="ml-2"
                color={loaderColor}
                visible
                fill="none"
                size="xs"
              />
            </div>
          )}
        </Tag>
      );
    }
  };
  return connect(state => ({ form: state.form[formName] }))(HOC);
}
