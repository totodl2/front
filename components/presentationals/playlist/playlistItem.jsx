import React, { PureComponent } from 'react';
import cl from 'classnames';
import PropTypes from 'prop-types';
import querySelectorParent from '../../../lib/dom/querySelectorParent';

import styles from './index.module.scss';
import { scrollToElement } from '../../../lib/dom/scrollTo';
import isServer from '../../../lib/isServer';

class PlaylistItem extends PureComponent {
  static propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string,
    children: PropTypes.node,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    hoverable: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (!this.ref.current || !this.props.active || isServer) {
      return;
    }
    this.focus();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !this.ref.current ||
      !this.props.active ||
      isServer ||
      prevProps.active === this.props.active
    ) {
      return;
    }
    this.focus();
  }

  focus = () => {
    const parentContainer = querySelectorParent(
      `.${styles.playlist}`,
      this.ref.current,
    );

    if (!parentContainer) {
      return;
    }

    scrollToElement(this.ref.current, true, true, parentContainer);
  };

  render() {
    const {
      children,
      className,
      active,
      hoverable,
      disabled,
      as: Component = 'div',
      ...props
    } = this.props;
    return (
      <Component
        {...props}
        ref={this.ref}
        className={cl(className, styles.playlistItem, {
          [styles.playlistItemHoverableActive]: active,
          [styles.playlistItemHoverable]: hoverable && !disabled,
          [styles.playlistItemDisabled]: disabled,
        })}
      >
        {children}
      </Component>
    );
  }
}

export default PlaylistItem;
