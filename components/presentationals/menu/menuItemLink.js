import React from 'react';

import Link from 'next/link';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import MenuItem from './menuItem';

const MenuItemLink = ({ router, href, onClick, as, children, ...props }) => (
  <MenuItem
    {...props}
    type={Link}
    href={href}
    as={as}
    active={router.asPath === as || router.pathname === href}
    hoverable
  >
    {({ wrap, ...childProps }) => (
      <a {...childProps} onClick={onClick}>
        {wrap(children)}
      </a>
    )}
  </MenuItem>
);

MenuItemLink.propTypes = {
  router: PropTypes.object,
  href: PropTypes.any,
  as: PropTypes.any,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default withRouter(MenuItemLink);
