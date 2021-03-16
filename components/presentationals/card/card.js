import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

/**
 * @param className
 * @param children
 * @param props
 * @returns {*}
 * @constructor
 */
const Card = ({ className, children, ...props }) => (
  <div className={cl(className, 'card')} {...props}>
    {children}
  </div>
);

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Card;
