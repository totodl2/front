import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

const Page = ({ children, className }) => (
  <div className={cl(className, 'container')}>{children}</div>
);

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Page;
