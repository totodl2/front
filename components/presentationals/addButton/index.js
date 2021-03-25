import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { ReactComponent as Plus } from 'feather-icons/dist/icons/plus.svg';

import styles from './index.module.scss';

const AddButton = ({ className, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cl(className, styles.fixedButton, 'btn btn-round btn-lg')}
  >
    <Plus />
  </button>
);

AddButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
