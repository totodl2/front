import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import Page from '../../layouts/page';

import logo from './asset/totoLogo.png';
import styles from './index.module.scss';

const Header = ({ className }) => (
  <div className={cl(className, styles.header)}>
    <Page className="d-flex align-items-center">
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
    </Page>
  </div>
);

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
