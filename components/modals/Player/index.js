import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';

import Player from '../../video/Player';

class PlayerModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  render() {
    const { isOpen, close, className, ...props } = this.props;

    return (
      <Modal size="lg" isOpen={isOpen} toggle={close} className={className}>
        <Player {...props} />
      </Modal>
    );
  }
}

export default PlayerModal;
