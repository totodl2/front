import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import styles from './menu.module.scss';
import MenuContent from './menuContent';
import MenuHeader from './menuHeader';

const Menu = ({ className, children, mobile, opened, toggle }) => (
  <div
    className={cl(className, styles.menu, {
      [styles.menuClosed]: !opened,
      [styles.menuMobile]: mobile,
    })}
  >
    <MenuHeader toggle={toggle} opened={opened} />
    <MenuContent mobile={mobile} opened={opened}>
      {children}
    </MenuContent>
  </div>
);

Menu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  mobile: PropTypes.bool,
  opened: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};

export default Menu;
