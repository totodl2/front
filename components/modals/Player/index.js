import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import cl from 'classnames';
import { X } from 'react-feather';

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

    return (
      <Modal
        size="lg"
        isOpen={isOpen}
        toggle={close}
        className={cl(className, styles.modal)}
      >
        <button
          type="button"
          className={cl('btn btn-round btn-outline-white', styles.close)}
          onClick={close}
        >
          <X />
        </button>
        <Player {...props} />
      </Modal>
    );
  }
}

export default PlayerModal;
