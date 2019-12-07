import React, { PureComponent } from 'react';
import cl from 'classnames';
import PropTypes from 'prop-types';
import { Activity } from 'react-feather';
import Router from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';

import Menu from '../../presentationals/menu/menu';
import MenuContainer, {
  TYPE_DESKTOP,
  TYPE_TABLET,
  TYPE_MOBILE,
} from '../../presentationals/menu/menuContainer';
import Page from '../../layouts/page';

import styles from './index.module.scss';
import Header from '../../presentationals/header';
import Token from '../../../lib/token/token';
import MenuItem from '../../presentationals/menu/menuItem';

import withToken from '../../../lib/token/withToken';
import WaveLoader from '../../presentationals/waveLoader';
import MenuUser from '../../presentationals/menuUser';

export class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    token: PropTypes.instanceOf(Token).isRequired,
    user: PropTypes.object,
    userLoading: PropTypes.bool,
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

  render() {
    const { children, token, user, userLoading } = this.props;

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
                logout={token.logout}
                menuOpened={opened}
              />
              <MenuItem href="/in" icon={<Activity />}>
                Torrents
              </MenuItem>
              {process.env.NODE_ENV === 'development' && (
                <MenuItem href="/demo" icon={<Activity />}>
                  Démo
                </MenuItem>
              )}
            </Menu>
            <div
              className={cl(styles.menuAlign, {
                [styles.menuAlignDesktopOpened]:
                  opened && type === TYPE_DESKTOP,
                [styles.menuAlignTablet]: type === TYPE_TABLET,
              })}
            >
              <Header />
              <Page>
                {children}
                <WaveLoader visible={this.state.pageLoading} />
              </Page>
            </div>
          </>
        )}
      </MenuContainer>
    );
  }
}

export default compose(
  withToken(),
  connect(state => ({
    user: get(state, 'me.data', {}),
    userLoading: get(state, 'me.loading', false),
  })),
)(Layout);
