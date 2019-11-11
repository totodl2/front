import React from 'react';
import { Consumer } from './context';

const withToken = (propName = 'token') => Component => {
  const HOC = props => (
    <Consumer>
      {value => <Component {...props} {...{ [propName]: value }} />}
    </Consumer>
  );

  HOC.displayName = `withToken(${Component.displayName ||
    Component.name ||
    'Anonymous'})`;

  HOC.getInitialProps = Component.getInitialProps;

  return HOC;
};

export default withToken;
