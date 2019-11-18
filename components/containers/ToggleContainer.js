import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ToggleContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    view: PropTypes.any,
    defaultOpened: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      opened: !!props.defaultOpened,
    };
  }

  toggle = evt => {
    if (evt) {
      if (
        evt.defaultPrevented ||
        (typeof evt.isPropagationStopped === 'function' &&
          evt.isPropagationStopped())
      ) {
        return;
      }
      evt.stopPropagation();
    }

    this.setState(state => ({ opened: !state.opened }));
  };

  render() {
    const { view: View, defaultOpened, ...restProps } = this.props;
    const { opened } = this.state;
    const props = {
      isOpen: opened,
      toggle: this.toggle,
    };

    return View ? (
      <View {...restProps} {...props} />
    ) : (
      this.props.children(props)
    );
  }
}

export default ToggleContainer;
