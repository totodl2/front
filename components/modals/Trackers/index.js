import React, { PureComponent } from 'react';
import cl from 'classnames';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import ModalHeader from 'reactstrap/lib/ModalHeader';

import ModalTitle from './modalTitle';
import styles from './styles.module.scss';

class TrackersModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func.isRequired,
    className: PropTypes.string,
    torrent: PropTypes.object.isRequired,
  };

  render() {
    const { isOpen, close, className, torrent } = this.props;
    const trackers = get(torrent, 'trackers', []);

    return (
      <Modal size="md" isOpen={isOpen} toggle={close} className={className}>
        <ModalHeader tag={ModalTitle} toggle={close}>
          Trackers for {torrent.name}
        </ModalHeader>
        <ModalBody className="py-4">
          {trackers.length <= 0 && <p>No trackers found</p>}
          {trackers.length > 0 && (
            <ul className={cl(styles.list, 'mb-0')}>
              {trackers.map(t => (
                <li key={t.id}>{t.announce || t.scrape}</li>
              ))}
            </ul>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="mx-auto">
            <button type="button" className="btn" onClick={close}>
              Close
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default TrackersModal;
