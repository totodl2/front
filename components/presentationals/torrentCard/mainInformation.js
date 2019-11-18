import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import styles from './mainInformation.module.scss';

const MainInformation = ({ className, label, children }) => (
  <div className={cl(className, styles.main)}>
    <div>{children}</div>
    {label && <h6 className="mb-0">{label}</h6>}
  </div>
);

MainInformation.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default MainInformation;
