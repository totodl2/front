import React from 'react';
import Loader from './Loader';

export const VisibleContainerLoader = props => <Loader {...props} />;
VisibleContainerLoader.propTypes = Loader.propTypes;
VisibleContainerLoader.defaultProps = {
  ...Loader.defaultProps,
  visible: true,
  fill: 'container',
};
export default VisibleContainerLoader;
