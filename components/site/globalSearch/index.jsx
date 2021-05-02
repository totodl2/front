import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Router from 'next/router';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';

import Token from '../../../lib/token/token';
import withToken from '../../../lib/token/withToken';
import GlobalSearchContainer from '../../containers/GlobalSearchContainer';
import GlobalSearchInput from '../../forms/fields/GlobalSearchInput';
import { getConfiguration } from '../../../redux/actions/metadataConfiguration';

class GlobalSearch extends PureComponent {
  static propTypes = {
    token: PropTypes.instanceOf(Token).isRequired,
    getConfiguration: PropTypes.func.isRequired,
    metadataConfiguration: PropTypes.object,
  };

  componentDidMount() {
    if (this.props.token.isLogged()) {
      this.props.getConfiguration();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.metadataConfiguration.images &&
      this.props.token.isLogged() &&
      !prevProps.token.isLogged()
    ) {
      this.props.getConfiguration();
    }
  }

  onResultSelected = data => {
    if (data === null) {
      return;
    }

    if (data.type === 'file') {
      window.open(data.url);
    } else if (data.type === 'movie') {
      Router.replace(
        '/in/movies/[id]',
        `/in/movies/${encodeURIComponent(data.id)}`,
      );
    } else if (data.type === 'tv') {
      Router.replace('/in/tv/[id]', `/in/tv/${encodeURIComponent(data.id)}`);
    } else if (data.type === 'torrent') {
      Router.replace('/in/[hash]', `/in/${encodeURIComponent(data.hash)}`);
    }
  };

  render() {
    const { token, metadataConfiguration } = this.props;

    if (!token.isLogged() || !metadataConfiguration.images) {
      return null;
    }

    return (
      <GlobalSearchContainer>
        {({ search, loading, results }) => (
          <GlobalSearchInput
            placeholder="Search file, torrent, movie, tv show, actor... "
            defaultOptions={results}
            metadataConfiguration={metadataConfiguration}
            isLoading={loading}
            cacheOptions={false}
            loadOptions={search}
            onChange={this.onResultSelected}
            value={null}
            autoFocus
          />
        )}
      </GlobalSearchContainer>
    );
  }
}

export default compose(
  withToken(),
  connect(
    state => ({
      metadataConfiguration: get(state, 'metadataConfiguration', {}),
    }),
    dispatch => bindActionCreators({ getConfiguration }, dispatch),
  ),
)(GlobalSearch);
