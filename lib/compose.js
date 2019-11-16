/**
 * Custom compose preserving getInitialProps
 * @param hocs
 * @returns {function(*=): *}
 */
const compose = (...hocs) => Component => {
  const ComposedComponent = hocs.reduce((PreviousComponent, withHoc) => {
    const NewComponent = withHoc(PreviousComponent);
    if (typeof NewComponent.getInitialProps !== 'function') {
      NewComponent.getInitialProps = async ctx => {
        if (typeof PreviousComponent.getInitialProps === 'function') {
          return PreviousComponent.getInitialProps(ctx);
        }
        return {};
      };
    }
    return NewComponent;
  }, Component);

  return ComposedComponent;
};

export default compose;
