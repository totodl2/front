import React from 'react';
import Loader from './Loader';

export const VisiblePageLoader = props => <Loader {...props} />;
VisiblePageLoader.propTypes = Loader.propTypes;
VisiblePageLoader.defaultProps = {
  ...Loader.defaultProps,
  visible: true,
  fill: 'page',
};
export default VisiblePageLoader;
