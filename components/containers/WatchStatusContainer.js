import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withApi from '../../lib/api/withApi';
import handleApiError from '../../lib/utils/handleApiError';

class WatchStatusContainer extends PureComponent {
  static propTypes = {
    view: PropTypes.any,
    children: PropTypes.func,
    api: PropTypes.object.isRequired,
  };

  state = {
    fileId: null,
    watchStatus: null,
    loading: false,
    error: null,
    updateLoading: false,
    updateError: null,
  };

  getFileStatus = async fileId => {
    const { api } = this.props;
    try {
      this.setState({
        fileId,
        watchStatus: null,
        loading: true,
        error: null,
      });
      const result =
        (
          await api.watchStatus.getFileStatus({
            routeParams: { file: fileId },
          })
        ).data || null;
      this.setState({ watchStatus: result });
      return result;
    } catch (e) {
      this.setState({ error: handleApiError(e) });
    } finally {
      this.setState({ loading: false });
    }
    return null;
  };

  updateFileStatus = async (fileId, position, length) => {
    const { api } = this.props;
    try {
      this.setState(state => ({
        fileId,
        watchStatus: fileId !== state.fileId ? null : state.watchStatus,
        updateLoading: true,
        updateError: null,
      }));
      const result =
        (
          await api.watchStatus.setPosition({
            routeParams: { file: fileId, position, length },
          })
        ).data || null;
      this.setState({ watchStatus: result });
      return result;
    } catch (e) {
      this.setState({ updateError: handleApiError(e) });
    } finally {
      this.setState({ updateLoading: false });
    }
    return null;
  };

  render() {
    const { view: View, api, ...props } = this.props;
    const {
      fileId,
      watchStatus,
      loading,
      error,
      updateLoading,
      updateError,
    } = this.state;

    if (View) {
      return (
        <View
          fileId={fileId}
          {...props}
          fileWatchStatus={watchStatus}
          watchStatusLoading={loading}
          watchStatusError={error}
          watchStatusUpdateError={updateError}
          watchStatusUpdateLoading={updateLoading}
          getFileWatchStatus={this.getFileStatus}
          updateFileWatchStatus={this.updateFileStatus}
        />
      );
    }

    return this.props.children({
      fileId,
      loading,
      error,
      watchStatus,
      updateLoading,
      updateError,
      getFileStatus: this.getFileStatus,
      updateFileStatus: this.updateFileStatus,
    });
  }
}

export default withApi()(WatchStatusContainer);
