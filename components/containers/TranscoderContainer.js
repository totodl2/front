import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withApi from '../../lib/api/withApi';
import handleApiError from '../../lib/utils/handleApiError';

class TranscoderContainer extends PureComponent {
  static propTypes = {
    view: PropTypes.any,
    children: PropTypes.func.isRequired,
    api: PropTypes.object.isRequired,
  };

  state = {
    fileId: null,
    loading: false,
    error: null,
  };

  queue = async fileId => {
    const { api } = this.props;
    try {
      this.setState({ fileId, loading: true, error: null });
      await api.transcoders.queue({
        routeParams: { file: fileId },
      });
    } catch (e) {
      this.setState({ error: handleApiError(e) });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { view: View, api, ...props } = this.props;
    const { fileId, loading, error } = this.state;
    const newProps = {
      fileId,
      loading,
      error,
      transcode: this.queue,
    };

    return View ? (
      <View {...props} {...newProps} />
    ) : (
      this.props.children(newProps)
    );
  }
}

export default withApi()(TranscoderContainer);
