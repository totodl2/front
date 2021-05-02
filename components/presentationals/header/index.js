import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import Link from 'next/link';

import Page from '../../layouts/page';

import logo from './asset/logototo.png';
import logo2x from './asset/logototo@2.png';
import logo3x from './asset/logototo@3.png';

import styles from './index.module.scss';

const Header = ({ className, href, children }) => (
  <div className={cl(className, styles.header)}>
    <Page className="d-flex align-items-center">
      <div className={styles.logo}>
        <Link href={href}>
          <a className="d-sm-block d-none">
            <img src={logo} srcSet={`${logo2x} 2x, ${logo3x} 3x`} alt="logo" />
          </a>
        </Link>
      </div>
      {children}
    </Page>
  </div>
);

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
};

export default Header;
