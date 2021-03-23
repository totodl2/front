import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import Player from '../../video/Player';

import styles from './index.module.scss';

class PlayerModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  render() {
    const { isOpen, close, className, ...props } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <Player
        {...props}
        onClose={close}
        className={cl(styles.playerContainer)}
        videoClassName={styles.playerContainerVideo}
      />
    );
  }
}

export default PlayerModal;
