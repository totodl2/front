const withInitialProps = getInitialProps => Component => {
  // eslint-disable-next-line no-param-reassign
  Component.getInitialProps = getInitialProps;
  return Component;
};

export default withInitialProps;
