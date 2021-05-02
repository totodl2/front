import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import styles from './index.module.scss';

// eslint-disable-next-line jsx-a11y/label-has-associated-control
const Label = ({ className, ...props }) => (
  <label {...props} className={cl(className, styles.label)} />
);

Label.propTypes = {
  className: PropTypes.string,
};

export default Label;
