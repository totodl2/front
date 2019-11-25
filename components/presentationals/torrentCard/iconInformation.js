import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import styles from './iconInformation.module.scss';

const IconInformation = ({ help, icon: Icon, children, className, color }) => (
  <>
    <span
      className={cl(className, styles.informations, {
        [styles[`informations--${color}`]]: color,
      })}
      title={help}
    >
      {Icon && <Icon size="sm" className={styles.informationsIcon} />}
      <span className={styles.informationsContent}>{children}</span>
    </span>
  </>
);

IconInformation.propTypes = {
  help: PropTypes.string,
  icon: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(['success', 'danger', 'primary']),
};

export default IconInformation;
