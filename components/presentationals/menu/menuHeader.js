import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { X, Menu } from 'react-feather';

import styles from './menuHeader.module.scss';

const MenuHeader = ({ className, opened, toggle }) => (
  <div className={cl(className, styles.header)}>
    <button
      type="button"
      className={cl('btn btn-lg btn-white', styles.button)}
      onClick={toggle}
    >
      {!opened && <Menu />}
      {opened && <X />}
    </button>
  </div>
);

MenuHeader.propTypes = {
  className: PropTypes.string,
  opened: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};

export default MenuHeader;
