import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import styles from './index.module.scss';
import Page from '../../layouts/page';

const Header = ({ onLogout, className, children }) => (
  <div className={cl(className, styles.header)}>
    <Page className="d-flex align-items-center">
      <div className="w-100">{children}</div>
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
  children: PropTypes.node,
};

export default Header;
