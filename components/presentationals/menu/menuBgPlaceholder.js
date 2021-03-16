import React from 'react';

import cl from 'classnames';
import PropTypes from 'prop-types';
import styles from './menuBgPlaceholder.module.scss';
import MenuItem from './menuItem';

const MenuBgPlaceholder = ({ className }) => (
  <MenuItem className={cl(className, styles.menuBg)} />
);

MenuBgPlaceholder.propTypes = {
  className: PropTypes.string,
};

export default MenuBgPlaceholder;
