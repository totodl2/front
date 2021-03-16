import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { resetSection, arrayRemove, SubmissionError } from 'redux-form';
import get from 'lodash/get';
import set from 'lodash/set';
import { bindActionCreators } from 'redux';

import { Form, SubmitButton, NAME } from '../../forms/upload';
import { handleResponseErrors } from '../../../lib/form/processApiErrors';
import WaveLoader from '../../presentationals/waveLoader';

class UploadModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func.isRequired,
    className: PropTypes.string,
    api: PropTypes.object.isRequired,
    resetSection: PropTypes.func.isRequired,
    arrayRemove: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
  };

  uploadMagnet = async magnet => {
    try {
      await this.props.api.torrents.upload.magnet({ data: { url: magnet } });
      this.props.resetSection(NAME, 'magnet');
    } catch (e) {
      throw new SubmissionError({
        magnet: get(e, 'response.data.message', 'Unknown error'),
      });
    }
  };

  uploadFile = async file => {
    try {
      const formData = new FormData();
      formData.append('torrent', file);
      await this.props.api.torrents.upload.file({ data: formData });
      this.props.arrayRemove(NAME, 'files', 0);
    } catch (e) {
      throw new SubmissionError(
        set({}, `files[0]`, get(e, 'response.data.message', 'Unknown error')),
      );
    }
  };

  onSubmit = async data => {
    this.setState({ loading: true });

    try {
      if (data.magnet) {
        await this.uploadMagnet(data.magnet);
      }

      if (data.files && data.files.length > 0) {
        await data.files.reduce(async (prev, file) => {
          await prev;
          return this.uploadFile(file);
        }, Promise.resolve());
      }

      this.props.close();
    } catch (e) {
      if (e instanceof SubmissionError) {
        throw e;
      } else {
        console.warn(e);
        handleResponseErrors(e, data);
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { isOpen, close, className } = this.props;

    return (
      <Modal size="lg" isOpen={isOpen} toggle={close} className={className}>
        <ModalHeader toggle={close}>Upload</ModalHeader>
        <ModalBody className="py-0">
          <Form className="mt-4" onSubmit={this.onSubmit} />
        </ModalBody>
        <ModalFooter>
          <div className="mx-auto">
            <button type="button" className="btn mr-2" onClick={close}>
              Fermer
            </button>
            <SubmitButton className="btn btn-primary">Envoyer</SubmitButton>
          </div>
        </ModalFooter>
        <WaveLoader visible={this.state.loading} />
      </Modal>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => bindActionCreators({ resetSection, arrayRemove }, dispatch),
)(UploadModal);
