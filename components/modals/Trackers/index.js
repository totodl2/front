import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import ModalTitle from './modalTitle';
import styles from './styles.module.scss';

class TrackersModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func.isRequired,
    className: PropTypes.string,
    torrent: PropTypes.object.isRequired,
  };

  formatUrl(url) {
    if (typeof URL === 'function') {
      return new URL(url).hostname;
    }
    return url;
  }

  render() {
    const { isOpen, close, className, torrent } = this.props;
    const trackers = get(torrent, 'trackers', []);

    return (
      <Modal size="md" isOpen={isOpen} toggle={close} className={className}>
        <ModalHeader tag={ModalTitle} toggle={close}>
          Trackers for {torrent.name}
        </ModalHeader>
        <ModalBody className="py-0">
          {trackers.length <= 0 && <p>No trackers found</p>}
          {trackers.length > 0 && (
            <ul className={styles.list}>
              {trackers.map(t => (
                <li key={t.id}>{this.formatUrl(t.announce)}</li>
              ))}
            </ul>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="mx-auto">
            <button type="button" className="btn" onClick={close}>
              Fermer
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default TrackersModal;
