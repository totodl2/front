import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { bindActionCreators, compose } from 'redux';
import withApi from '../../lib/api/withApi';
import {
  patch,
  removeData,
  add,
  updateFile,
  createFile,
} from '../../redux/actions/torrents';
import { updateCurrentFile as updateMovieFile } from '../../redux/actions/moviesCurrent';

import { updateMe } from '../../redux/actions/me';
import isServer from '../../lib/isServer';
import withToken from '../../lib/token/withToken';
import Token from '../../lib/token/token';

class SSE extends PureComponent {
  static propTypes = {
    api: PropTypes.object.isRequired,
    patch: PropTypes.func.isRequired,
    removeData: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    updateFile: PropTypes.func.isRequired,
    createFile: PropTypes.func.isRequired,
    updateMovieFile: PropTypes.func.isRequired,
    updateMe: PropTypes.func.isRequired,
    token: PropTypes.instanceOf(Token),
  };

  componentDidMount() {
    if (isServer) {
      return;
    }
    const { api, token } = this.props;
    this.eventSource = api.sse();
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
    this.eventSource.addEventListener(
      'files.created',
      this.onTorrentFileCreated,
    );
    this.userUpdatedEventName = `users.${get(token, 'id', 0)}.updated`;
    this.eventSource.addEventListener(
      this.userUpdatedEventName,
      this.onUserUpdated,
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
      this.eventSource.removeEventListener(
        'files.created',
        this.onTorrentFileCreated,
      );
      this.eventSource.removeEventListener(
        this.userUpdatedEventName,
        this.onUserUpdated,
      );
      this.eventSource = null;
    }
  }

  onTorrentFileUpdated = ({ data: jsonData }) => {
    const data = JSON.parse(jsonData);
    this.props.updateFile(data.hash, data.id, data.changes);
    this.props.updateMovieFile(data.id, data.changes);
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

  onTorrentFileCreated = ({ data: jsonData }) => {
    const { hash, ...data } = JSON.parse(jsonData);
    this.props.createFile(hash, data);
  };

  onUserUpdated = ({ data: jsonData }) => {
    const { hash, ...data } = JSON.parse(jsonData);
    this.props.updateMe(data.changes);
  };

  render() {
    return null;
  }
}

export default compose(
  withApi(),
  withToken(),
  connect(
    () => ({}),
    dispatch =>
      bindActionCreators(
        {
          patch,
          removeData,
          add,
          updateFile,
          createFile,
          updateMe,
          updateMovieFile,
        },
        dispatch,
      ),
  ),
)(SSE);
