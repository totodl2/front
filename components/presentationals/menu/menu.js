import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import styles from './menu.module.scss';

const Menu = ({ className, children }) => (
  <div className={cl(className, styles.menu)}>{children}</div>
);

Menu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Menu;
