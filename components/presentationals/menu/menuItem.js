import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import styles from './menuItem.module.scss';

const noop = () => {};

class MenuItem extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node,
    active: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    hoverable: PropTypes.bool,
    type: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (this.props.active) {
      this.applyActiveStyle();
    } else {
      this.removeActiveStyle();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active === this.props.active) {
      return;
    }

    if (this.props.active) {
      this.applyActiveStyle();
    } else {
      this.removeActiveStyle();
    }
  }

  componentWillUnmount() {
    this.removeActiveStyle();
  }

  onMouseEnter = () => {
    this.applyActiveStyle();
  };

  onMouseLeave = () => {
    if (!this.props.active) {
      this.removeActiveStyle();
    }
  };

  // ActiveStyle => dirty fix
  applyActiveStyle() {
    if (!this.ref.current) {
      return;
    }

    const previous = this.ref.current.previousSibling;
    if (previous && previous.matches(`.${styles.menuItem}`)) {
      previous.classList.add(styles.menuItemPreviousActive);
    }

    const after = this.ref.current.nextSibling;
    if (after && after.matches(`.${styles.menuItem}`)) {
      after.classList.add(styles.menuItemAfterActive);
    }
  }

  removeActiveStyle() {
    if (!this.ref.current) {
      return;
    }

    const previous = this.ref.current.previousSibling;
    if (previous && previous.matches(`.${styles.menuItem}`)) {
      previous.classList.remove(styles.menuItemPreviousActive);
    }

    const after = this.ref.current.nextSibling;
    if (after && after.matches(`.${styles.menuItem}`)) {
      after.classList.remove(styles.menuItemAfterActive);
    }
  }

  render() {
    const {
      className,
      children,
      icon,
      type: Type = 'div',
      hoverable,
      active,
      ...props
    } = this.props;

    const wrap = content => (
      <>
        {icon && <div className={styles.menuItemIcon}>{icon}</div>}
        <div
          className={cl(styles.menuItemText, {
            [styles.menuItemTextIconless]: !icon,
          })}
        >
          {content}
        </div>
      </>
    );

    const isRenderProp = typeof children === 'function';
    const displayedProps = {
      className: cl(className, styles.menuItem, {
        [styles.menuItemHoverable]: hoverable,
        [styles.menuItemActive]: active,
      }),
      ref: this.ref,
      onMouseEnter: hoverable ? this.onMouseEnter : noop,
      onMouseLeave: hoverable ? this.onMouseLeave : noop,
    };

    return (
      <Type {...props} {...(isRenderProp ? {} : displayedProps)}>
        {isRenderProp ? children({ ...displayedProps, wrap }) : wrap(children)}
      </Type>
    );
  }
}

export default MenuItem;
