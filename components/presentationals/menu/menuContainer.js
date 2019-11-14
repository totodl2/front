import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const isServer = typeof window === 'undefined';

export const TYPE_DESKTOP = 'desktop';
export const TYPE_TABLET = 'tablet';
export const TYPE_MOBILE = 'mobile';

class MenuContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.func,
    mobileWidth: PropTypes.number,
    view: PropTypes.element,
    tabletWidth: PropTypes.number,
  };

  static defaultProps = { mobileWidth: 576, tabletWidth: 1200 };

  constructor(props) {
    super(props);
    const type = this.detectDeviceType();
    this.state = {
      opened: type === TYPE_DESKTOP,
      type,
    };
  }

  componentDidMount() {
    if (!isServer) {
      window.addEventListener('resize', this.onWindowResize);
    }
  }

  componentWillUnmount() {
    if (!isServer) {
      window.removeEventListener('resize', this.onWindowResize);
    }
  }

  onWindowResize = () => {
    const { type, opened } = this.state;
    const newType = this.detectDeviceType();
    if (type !== newType) {
      const mobile = type !== TYPE_DESKTOP;
      this.setState({
        type: newType,
        opened: mobile ? false : opened,
      });
    }
  };

  detectDeviceType = () => {
    if (isServer) {
      return TYPE_DESKTOP;
    }

    const { mobileWidth, tabletWidth } = this.props;
    const { width } = document.body.getBoundingClientRect();

    if (width <= mobileWidth) {
      return TYPE_MOBILE;
    }
    if (width <= tabletWidth) {
      return TYPE_TABLET;
    }
    return TYPE_DESKTOP;
  };

  toggle = () => {
    this.setState(state => ({ opened: !state.opened }));
  };

  close = () => this.setState({ opened: false });

  open = () => this.setState({ opened: true });

  render() {
    const { view: View, mobileWidth, tabletWidth, ...restProps } = this.props;
    const { opened, type } = this.state;
    const props = {
      type,
      opened,
      toggle: this.toggle,
      open: this.open,
      close: this.close,
    };

    return View ? (
      <View {...restProps} {...props} />
    ) : (
      this.props.children(props)
    );
  }
}

export default MenuContainer;
