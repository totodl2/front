import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class RequestCloseModal extends PureComponent {
  static propTypes = {
    close: PropTypes.func.isRequired,
  };

  onRequestClose = async () => true;

  forceClose = data => this.props.close(data);

  close = async (data, forceClose = false) => {
    if (!forceClose && (await this.onRequestClose(data))) {
      this.props.close(data);
    }
  };
}

export default RequestCloseModal;
