import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import Page from '../../layouts/page';

import logo from './asset/totoLogo.png';
import styles from './index.module.scss';

const Header = ({ onLogout, className }) => (
  <div className={cl(className, styles.header)}>
    <Page className="d-flex align-items-center">
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      {onLogout && (
        <div className="ml-auto">
          <button type="button" className="btn btn-white" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </Page>
  </div>
);

Header.propTypes = {
  className: PropTypes.string,
  onLogout: PropTypes.func,
};

export default Header;
