import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import styles from './loader.module.scss';

export default class Loader extends Component {
  static sizes = {
    md: 'md',
    sm: 'sm',
    xs: 'xs',
    lg: 'lg',
  };

  static propTypes = {
    fill: PropTypes.oneOf(['page', 'container', 'none']),
    color: PropTypes.string,
    fillClassName: PropTypes.string,
    className: PropTypes.string,
    visible: PropTypes.bool,
    size: PropTypes.oneOf([...Object.values(Loader.sizes), '']),
    children: PropTypes.any,
  };

  static defaultProps = {
    visible: false,
    className: '',
    fillClassName: '',
    size: '',
    fill: 'container',
    color: 'primary',
  };

  render() {
    const {
      children,
      className,
      visible,
      fill,
      size,
      fillClassName,
      color,
    } = this.props;
    const out = (
      <div
        className={cl(styles.loader, className, {
          [styles.loaderFillVisible]: visible,
          [styles.loaderFillHidden]: !visible,
          'mt-auto': fill !== 'none' && children,
          'my-auto': fill !== 'none' && !children,
          [styles[`loader-${size}`]]: size,
          [styles[`loader--${color}`]]: !!color,
        })}
      >
        <svg className={styles.circular} viewBox="25 25 50 50">
          <circle
            className={styles.path}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    );

    if (fill !== 'none') {
      return (
        <div
          className={cl(fillClassName, styles.loaderFill, {
            [styles[`loader-fill--${fill}`]]: fill,
            [styles.loaderFillVisible]: visible,
            [styles.loaderFillHidden]: !visible,
          })}
        >
          {out}
          {children ? <div className={styles.content}>{children}</div> : null}
        </div>
      );
    }

    return out;
  }
}
