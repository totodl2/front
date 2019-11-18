import React from 'react';
import PropTypes from 'prop-types';

import cl from 'classnames';

import styles from './index.module.scss';

const Progress = ({ color, percent, className }) => (
  <div className={cl(className, styles.progress, styles[`progress--${color}`])}>
    <div
      className={cl(styles.progressBar, styles[`progress-bar--${color}`])}
      style={{ right: `${100 - percent}%` }}
    />
  </div>
);

Progress.propTypes = {
  color: PropTypes.oneOf(['primary', 'success', 'normal']),
  percent: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Progress;
