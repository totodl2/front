import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import Page from '../../layouts/page';

import logo from './asset/logototo.png';
import logo2x from './asset/logototo@2.png';
import logo3x from './asset/logototo@3.png';

import styles from './index.module.scss';

const Header = ({ className, children }) => (
  <div className={cl(className, styles.header)}>
    <Page className="d-flex align-items-center">
      <div className={styles.logo}>
        <img src={logo} srcSet={`${logo2x} 2x, ${logo3x} 3x`} alt="logo" />
      </div>
      {children && <div className="ml-auto">{children}</div>}
    </Page>
  </div>
);

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Header;
