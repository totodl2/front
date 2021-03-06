import React, { PureComponent } from 'react';
import cl from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as Activity } from 'feather-icons/dist/icons/activity.svg';
import { ReactComponent as Plus } from 'feather-icons/dist/icons/plus.svg';
import { ReactComponent as Film } from 'feather-icons/dist/icons/film.svg';
import { ReactComponent as Tv } from 'feather-icons/dist/icons/tv.svg';

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
import SSE from '../../sse';
import GlobalSearch from '../globalSearch';

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
        {({ opened, toggle, type, close }) => (
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
              <MenuItemLink
                href="/in"
                icon={<Activity />}
                onClick={type === TYPE_MOBILE ? close : null}
              >
                Torrents
              </MenuItemLink>
              <MenuItemLink
                href="/in/movies"
                icon={<Film />}
                onClick={type === TYPE_MOBILE ? close : null}
              >
                Movies
              </MenuItemLink>
              <MenuItemLink
                href="/in/tv"
                icon={<Tv />}
                onClick={type === TYPE_MOBILE ? close : null}
              >
                Tv shows
              </MenuItemLink>
              {process.env.NODE_ENV === 'development' && (
                <MenuItemLink
                  href="/demo"
                  icon={<Activity />}
                  onClick={type === TYPE_MOBILE ? close : null}
                >
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
                <div className="d-flex flex-grow-1">
                  <div
                    className={cl(
                      'mx-auto flex-fill pl-0 pl-sm-4 pl-lg-5 pr-0',
                      { 'pr-lg-5': isUploader },
                    )}
                  >
                    <GlobalSearch />
                  </div>
                  {isUploader && (
                    <button
                      type="button"
                      className="ml-auto btn btn-outline-primary d-none d-lg-block"
                      onClick={this.onUpload}
                    >
                      <Plus /> Add torrents
                    </button>
                  )}
                </div>
              </Header>
              {children}
              <WaveLoader fill="page" visible={this.state.pageLoading} />
            </div>
            <SSE />
          </>
        )}
      </MenuContainer>
    );
  }
}

export default compose(
  withToken(),
  withApi(),
  connect(
    state => ({
      user: get(state, 'me.data', {}),
      userLoading: get(state, 'me.loading', false),
    }),
    dispatch => bindActionCreators({ destroyMe }, dispatch),
  ),
  connectModals({ UploadModal }),
)(Layout);
