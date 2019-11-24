import PropTypes from 'prop-types';
import React from 'react';
import cl from 'classnames';

import styles from './icons.module.scss';

const sizes = ['md', 'sm', 'xs'];

export default class BaseIcon extends React.Component {
  static propTypes = {
    size: PropTypes.oneOf(sizes),
    viewBox: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    viewBox: '0 0 60 60',
  };

  // eslint-disable-next-line no-unused-vars
  getClasses(iconName) {
    const { size, className } = this.props;

    return cl(className, styles.icon, {
      [styles[`icon--${size}`]]: size,
    });
  }

  getViewBox() {
    const { viewBox, size } = this.props;

    if (size && sizes[size]) {
      return `0 0 ${sizes[size]} ${sizes[size]}`;
    }

    return viewBox;
  }
}
