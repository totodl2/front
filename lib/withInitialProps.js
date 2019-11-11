export default getInitialProps => Component => {
  // eslint-disable-next-line no-param-reassign
  Component.getInitialProps = getInitialProps;
  return Component;
};
