import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../presentationals/card/card';
import Page from '../page';

const Login = ({ children, className }) => (
  <Page className="min-vh-100">
    <div className="row py-5 min-vh-100 align-items-center justify-content-center">
      <div className={className}>
        <Card>{children}</Card>
      </div>
    </div>
  </Page>
);

Login.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Login.defaultProps = { className: 'col-md-5' };

export default Login;
