import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import styles from './menuContent.module.scss';

const MenuContent = ({ children, className, mobile, opened }) => (
  <div
    className={cl(className, styles.menuContent, {
      [styles.menuContentMobile]: mobile,
      [styles.menuContentMobileOpened]: opened,
    })}
  >
    {children}
  </div>
);

MenuContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  mobile: PropTypes.bool,
  opened: PropTypes.bool,
};

export default MenuContent;
