import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { bindActionCreators, compose } from 'redux';
import withApi from '../../lib/api/withApi';
import {
  patch,
  removeData,
  add,
  updateFile,
} from '../../redux/actions/torrents';
import isServer from '../../lib/isServer';

class Torrents extends PureComponent {
  static propTypes = {
    api: PropTypes.object.isRequired,
    patch: PropTypes.func.isRequired,
    removeData: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    updateFile: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (isServer) {
      return;
    }
    this.eventSource = this.props.api.sse.torrents();
    this.eventSource.addEventListener(
      'torrents.updated',
      this.onTorrentUpdated,
    );
    this.eventSource.addEventListener(
      'torrents.created',
      this.onTorrentCreated,
    );
    this.eventSource.addEventListener(
      'torrents.deleted',
      this.onTorrentDeleted,
    );
    this.eventSource.addEventListener(
      'files.updated',
      this.onTorrentFileUpdated,
    );
  }

  componentWillUnmount() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource.removeEventListener(
        'torrents.updated',
        this.onTorrentUpdated,
      );
      this.eventSource.removeEventListener(
        'torrents.created',
        this.onTorrentCreated,
      );
      this.eventSource.removeEventListener(
        'torrents.deleted',
        this.onTorrentDeleted,
      );
      this.eventSource.removeEventListener(
        'files.updated',
        this.onTorrentFileUpdated,
      );
      this.eventSource = null;
    }
  }

  onTorrentFileUpdated = ({ data: jsonData }) => {
    const data = JSON.parse(jsonData);
    this.props.updateFile(data.hash, data.id, data.changes);
  };

  onTorrentUpdated = ({ data: jsonData }) => {
    const data = JSON.parse(jsonData);
    this.props.patch(data.hash, data.changes);
  };

  onTorrentDeleted = ({ data: jsonData }) => {
    const data = JSON.parse(jsonData);
    this.props.removeData(data.hash);
  };

  onTorrentCreated = ({ data: jsonData }) => {
    const data = JSON.parse(jsonData);
    this.props.add(data.hash, data);
  };

  render() {
    return null;
  }
}

export default compose(
  withApi(),
  connect(
    state => ({}),
    dispatch =>
      bindActionCreators({ patch, removeData, add, updateFile }, dispatch),
  ),
)(Torrents);
