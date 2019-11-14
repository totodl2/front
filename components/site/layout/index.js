import React, { PureComponent } from 'react';
import cl from 'classnames';
import PropTypes from 'prop-types';
import { Activity } from 'react-feather';
import { compose } from 'redux';

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
import withContainer from '../../../lib/withContainer';

export class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    token: PropTypes.instanceOf(Token).isRequired,
    opened: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { children, token, opened, toggle, type } = this.props;

    if (!token.isLogged()) {
      return children;
    }

    return (
      <div>
        <Menu
          opened={opened}
          toggle={toggle}
          mobile={type === TYPE_MOBILE}
          desktop={type === TYPE_DESKTOP}
          table={type === TYPE_TABLET}
        >
          <MenuItem href="/in" icon={<Activity />}>
            Torrents
          </MenuItem>
        </Menu>
        <div
          className={cl(styles.menuAlign, {
            [styles.menuAlignDesktopOpened]: opened && type === TYPE_DESKTOP,
            [styles.menuAlignTablet]: type === TYPE_TABLET,
          })}
        >
          <Header onLogout={token.logout} />
          <Page>{children}</Page>
        </div>
      </div>
    );
  }
}

export default compose(withContainer(MenuContainer), withToken())(Layout);
