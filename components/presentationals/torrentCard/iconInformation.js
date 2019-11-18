import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import { UncontrolledTooltip } from 'reactstrap';

import styles from './iconInformation.module.scss';

class IconInformation extends PureComponent {
  static propTypes = {
    help: PropTypes.string,
    icon: PropTypes.func.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.oneOf(['success', 'danger', 'primary']),
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    const { help, icon: Icon, children, className, color } = this.props;
    return (
      <>
        <span
          className={cl(className, styles.informations, {
            [styles[`informations--${color}`]]: color,
          })}
          ref={this.ref}
        >
          {Icon && <Icon size="sm" className={styles.informationsIcon} />}
          <span className={styles.informationsContent}>{children}</span>
        </span>
        {help && (
          <UncontrolledTooltip placement="top" target={this.ref}>
            {help}
          </UncontrolledTooltip>
        )}
      </>
    );
  }
}

export default IconInformation;
