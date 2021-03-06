import React from 'react';
const noop = (data = {}) => data;

const withContainer = (
  Container,
  getProps,
  viewKey = 'view',
  getWrappedProps,
) => WrappedComponent => {
  const WrappedPropsComponent = props => (
    <WrappedComponent {...getWrappedProps(props)} />
  );

  const Component = props => (
    <Container
      {...props}
      {...(getProps || noop)(props)}
      {...{
        [viewKey]: getWrappedProps ? WrappedPropsComponent : WrappedComponent,
      }}
    />
  );

  Component.displayName = `${Container.displayName ||
    Container.name ||
    'AnonymousContainer'}(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'AnonymousWrapped'})`;

  Component.getInitialProps = WrappedComponent.getInitialProps;

  return Component;
};

export default withContainer;
