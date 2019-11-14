import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import cl from 'classnames';

import styles from './menuItem.module.scss';

const MenuItem = ({
  router,
  href,
  as,
  className,
  children,
  icon,
  ...props
}) => (
  <Link href={href} as={as} {...props}>
    <a
      className={cl(className, styles.menuItem, {
        [styles.menuItemActive]:
          router.asPath === as || router.pathname === href,
      })}
    >
      {icon && <div className={styles.menuItemIcon}>{icon}</div>}
      <div
        className={cl(styles.menuItemText, {
          [styles.menuItemTextIconless]: !icon,
        })}
      >
        {children}
      </div>
    </a>
  </Link>
);

MenuItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  router: PropTypes.object,
  href: PropTypes.any,
  as: PropTypes.any,
  children: PropTypes.node,
};

export default withRouter(MenuItem);
