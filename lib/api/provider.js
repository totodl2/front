import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider as ReactProvider } from './context';

import createApi from './createApi';

class Provider extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    api: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      api: props.api || createApi(),
    };
  }

  render() {
    return (
      <ReactProvider value={this.state.api}>
        {this.props.children}
      </ReactProvider>
    );
  }
}

export default Provider;
