import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import styles from './selectActions.module.scss';

const SelectActions = ({ children, className }) => (
  <div className={cl(className, styles.selectActions)}>{children}</div>
);

SelectActions.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default SelectActions;
