import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

const CardBody = ({ className, children, ...props }) => (
  <div className={cl(className, 'card-body')} {...props}>
    {children}
  </div>
);

CardBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default CardBody;
