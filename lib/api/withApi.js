import React from 'react';
import { Consumer } from './context';

const withApi = (propName = 'api') => Component => {
  const HOC = props => (
    <Consumer>
      {value => <Component {...props} {...{ [propName]: value }} />}
    </Consumer>
  );

  HOC.displayName = `withApi(${Component.displayName ||
    Component.name ||
    'Anonymous'})`;

  HOC.getInitialProps = Component.getInitialProps;

  return HOC;
};

export default withApi;
