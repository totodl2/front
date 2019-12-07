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
  type,
  hoverable,
  ...props
}) => {
  const content = (
    <>
      {icon && <div className={styles.menuItemIcon}>{icon}</div>}
      <div
        className={cl(styles.menuItemText, {
          [styles.menuItemTextIconless]: !icon,
        })}
      >
        {children}
      </div>
    </>
  );

  if (type === 'link') {
    return (
      <Link href={href} as={as} {...props}>
        <a
          className={cl(className, styles.menuItem, styles.menuItemHoverable, {
            [styles.menuItemActive]:
              router.asPath === as || router.pathname === href,
          })}
        >
          {content}
        </a>
      </Link>
    );
  }

  return (
    <div
      className={cl(className, styles.menuItem, {
        [styles.menuItemHoverable]: hoverable,
      })}
    >
      {content}
    </div>
  );
};
MenuItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  router: PropTypes.object,
  href: PropTypes.any,
  as: PropTypes.any,
  children: PropTypes.node,
  hoverable: PropTypes.bool,
  type: PropTypes.oneOf(['link', 'div']),
};

MenuItem.defaultProps = {
  type: 'link',
};

export default withRouter(MenuItem);
