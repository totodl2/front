import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

const ModalTitle = ({ className, ...props }) => (
  <h5 className={cl(className, 'text-truncate')} {...props} />
);

ModalTitle.propTypes = {
  className: PropTypes.string,
};

export default ModalTitle;
