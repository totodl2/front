import React, { PureComponent } from 'react';
import cl from 'classnames';
import PropTypes from 'prop-types';
import { Activity, Plus, Film } from 'react-feather';
import Router from 'next/router';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';

import Menu from '../../presentationals/menu/menu';
import MenuContainer, {
  TYPE_DESKTOP,
  TYPE_TABLET,
  TYPE_MOBILE,
} from '../../presentationals/menu/menuContainer';
import { destroyMe } from '../../../redux/actions/me';
import styles from './index.module.scss';
import Header from '../../presentationals/header';
import Token from '../../../lib/token/token';

import withToken from '../../../lib/token/withToken';
import WaveLoader from '../../presentationals/waveLoader';
import MenuUser from '../../presentationals/menuUser';
import connectModals from '../../../lib/connectModals';
import UploadModal from '../../modals/Upload';
import withApi from '../../../lib/api/withApi';
import { hasRole, ROLE_UPLOADER } from '../../../lib/roles';
import MenuItemLink from '../../presentationals/menu/menuItemLink';
import withSSE from '../../../lib/sse/withSSE';

export class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    token: PropTypes.instanceOf(Token).isRequired,
    user: PropTypes.object,
    userLoading: PropTypes.bool,
    destroyMe: PropTypes.func.isRequired,
    openUploadModal: PropTypes.func.isRequired,
    api: PropTypes.object,
  };

  state = {
    pageLoading: false,
  };

  componentDidMount() {
    Router.events.on('routeChangeStart', this.onPageLoad);
    Router.events.on('routeChangeComplete', this.onPageStopLoading);
    Router.events.on('routeChangeError', this.onPageStopLoading);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.onPageLoad);
    Router.events.off('routeChangeComplete', this.onPageStopLoading);
    Router.events.off('routeChangeError', this.onPageStopLoading);
  }

  onPageLoad = () =>
    this.setState({
      pageLoading: true,
    });

  onPageStopLoading = () =>
    this.setState({
      pageLoading: false,
    });

  onUpload = () => this.props.openUploadModal({ api: this.props.api });

  logout = () => {
    this.props.destroyMe();
    return this.props.token.logout();
  };

  render() {
    const { children, token, user, userLoading } = this.props;
    const isUploader = hasRole(token.roles, ROLE_UPLOADER);

    if (!token.isLogged()) {
      return children;
    }
    return (
      <MenuContainer>
        {({ opened, toggle, type }) => (
          <>
            <Menu
              opened={opened}
              toggle={toggle}
              mobile={type === TYPE_MOBILE}
              desktop={type === TYPE_DESKTOP}
              tablet={type === TYPE_TABLET}
            >
              <MenuUser
                loading={userLoading}
                user={user}
                logout={this.logout}
                menuOpened={opened}
              />
              <MenuItemLink href="/in" icon={<Activity />}>
                Torrents
              </MenuItemLink>
              <MenuItemLink href="/in/movies" icon={<Film />}>
                Movies
              </MenuItemLink>
              {process.env.NODE_ENV === 'development' && (
                <MenuItemLink href="/demo" icon={<Activity />}>
                  Démo
                </MenuItemLink>
              )}
            </Menu>
            <div
              className={cl(styles.menuAlign, {
                [styles.menuAlignDesktopOpened]:
                  opened && type === TYPE_DESKTOP,
                [styles.menuAlignTablet]: type === TYPE_TABLET,
              })}
            >
              <Header href="/in">
                {isUploader && (
                  <button
                    type="button"
                    className="btn btn-outline-primary d-none d-sm-block"
                    onClick={this.onUpload}
                  >
                    <Plus /> Add torrents
                  </button>
                )}
              </Header>
              {children}
              <WaveLoader fill="page" visible={this.state.pageLoading} />
            </div>
          </>
        )}
      </MenuContainer>
    );
  }
}

export default compose(
  withToken(),
  withApi(),
  withSSE,
  connect(
    state => ({
      user: get(state, 'me.data', {}),
      userLoading: get(state, 'me.loading', false),
    }),
    dispatch => bindActionCreators({ destroyMe }, dispatch),
  ),
  connectModals({ UploadModal }),
)(Layout);
