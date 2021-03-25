import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FORM_ERROR } from 'final-form';
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import ModalHeader from 'reactstrap/lib/ModalHeader';

import Form from '../../forms/upload';
import { handleResponseErrors } from '../../../lib/form/processApiErrors';
import WaveLoader from '../../presentationals/waveLoader';
import UploadError from './uploadError';

class UploadModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func.isRequired,
    className: PropTypes.string,
    api: PropTypes.object.isRequired,
  };

  state = {
    loading: false,
  };

  uploadMagnet = async (magnet, form) => {
    try {
      await this.props.api.torrents.upload.magnet({ data: { url: magnet } });
      form.reset('magnet');
      return null;
    } catch (e) {
      const original = handleResponseErrors(e);
      // if default FORM_ERROR_KEY is setted, we re-route error to magnet key
      const { [FORM_ERROR]: unkError, ...rest } = original;
      if (unkError) {
        throw new UploadError({ magnet: unkError, ...rest });
      }
      throw new UploadError(original);
    }
  };

  uploadFile = async (file, mutators) => {
    try {
      const formData = new FormData();
      formData.append('torrent', file);
      await this.props.api.torrents.upload.file({ data: formData });
      mutators.remove('files', 0);
    } catch (e) {
      const original = handleResponseErrors(e);
      // if default FORM_ERROR_KEY is setted, we re-route error to file.0 key
      const { [FORM_ERROR]: unkError, torrent: totoErr, ...rest } = original;
      if (unkError) {
        throw new UploadError({ files: [unkError], ...rest });
      }
      if (totoErr) {
        throw new UploadError({ files: [totoErr], ...rest });
      }
      throw new UploadError(original);
    }
  };

  onSubmit = async (data, { mutators }) => {
    this.setState({ loading: true });

    try {
      if (data.magnet) {
        await this.uploadMagnet(data.magnet, mutators);
      }

      if (data.files && data.files.length > 0) {
        await data.files.reduce(async (prev, file) => {
          await prev;
          return this.uploadFile(file, mutators);
        }, Promise.resolve());
      }

      this.props.close();
      return null;
    } catch (e) {
      if (e instanceof UploadError) {
        return e.errors;
      }

      console.warn(e);
      return handleResponseErrors(e, data);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { isOpen, close, className } = this.props;

    return (
      <Modal size="lg" isOpen={isOpen} toggle={close} className={className}>
        <Form onSubmit={this.onSubmit}>
          {({ form }) => (
            <>
              <ModalHeader toggle={close}>Upload</ModalHeader>
              <ModalBody className="py-0 py-4">{form}</ModalBody>
              <ModalFooter>
                <div className="mx-auto">
                  <button type="button" className="btn mr-2" onClick={close}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Upload
                  </button>
                </div>
              </ModalFooter>
              <WaveLoader
                className="border-radius"
                visible={this.state.loading}
              />
            </>
          )}
        </Form>
      </Modal>
    );
  }
}

export default UploadModal;
