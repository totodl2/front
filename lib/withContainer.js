import React from 'react';
const noop = (data = {}) => data;

export const withContainer = (
  Container,
  getProps = noop,
  viewKey = 'view',
) => WrappedComponent => {
  const viewProps = { [viewKey]: WrappedComponent };

  const Component = props => (
    <Container {...props} {...getProps(props)} {...viewProps} />
  );

  Component.displayName = `withContainer(${Container.displayName ||
    Container.name ||
    'Anonymous'}, ${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Anonymous'})`;

  Component.getInitialProps = WrappedComponent.getInitialProps;

  return Component;
};

export default withContainer;
