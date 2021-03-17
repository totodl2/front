import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Smile } from 'react-feather';
import cl from 'classnames';
import ReactMinimalPieChart from 'react-minimal-pie-chart';

import MenuItem from '../menu/menuItem';
import VisibleContainerLoader from '../loader/VisibleContainerLoader';
import theme from '../../../styles/variables';
import PrettyBytes from '../prettyBytes';
import roles, { hasRole } from '../../../lib/roles';

import styles from './index.module.scss';

const chartSize = [100, 50];

class MenuUser extends PureComponent {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.object,
    loading: PropTypes.bool,
    menuOpened: PropTypes.bool,
  };

  getChartData() {
    const { user } = this.props;
    const usage = get(user, 'diskUsage', 0) / get(user, 'diskSpace', 0);

    let color = theme.success;
    if (usage > 0.9) {
      color = theme.danger;
    } else if (usage > 0.7) {
      color = theme.warning;
    }

    return [
      {
        color,
        title: 'Disk usage',
        value: usage,
      },
      {
        color: theme.white,
        title: 'Disk space',
        value: 1 - get(user, 'diskUsage', 0) / get(user, 'diskSpace', 0),
      },
    ];
  }

  isUploader() {
    return hasRole(get(this.props.user, 'roles', 0), roles.ROLE_UPLOADER);
  }

  renderChart = () => {
    const { user, menuOpened } = this.props;
    return (
      <div className="d-flex flex-column justify-content-center">
        <div
          className={cl(styles.menuUserChart, {
            [styles.menuUserChartSmall]: !menuOpened,
          })}
        >
          <ReactMinimalPieChart
            data={this.getChartData()}
            viewBoxSize={chartSize}
            radius={50}
            cy={50}
            cx={50}
            lineWidth={menuOpened ? 20 : 25}
            lengthAngle={180}
            startAngle={180}
            paddingAngle={0}
          />
          <div className={styles.menuUserChartPercent}>
            {Math.round(
              (get(user, 'diskUsage', 0) / get(user, 'diskSpace', 0)) * 100,
            )}
            %
          </div>
        </div>
        <h6 className="text-center mb-0">{menuOpened && 'Disk '}Usage</h6>
      </div>
    );
  };

  render() {
    const { logout, loading, user, menuOpened } = this.props;
    const isUploader = this.isUploader();

    return (
      <MenuItem
        type="div"
        className={cl('position-relative', styles.menuUser)}
        icon={this.isUploader() ? this.renderChart() : <Smile />}
      >
        <div
          className={cl('d-flex flex-column h-100 pr-3', {
            'ml-3': menuOpened && isUploader,
          })}
        >
          <div className="text-body text-truncate mb-auto">
            {get(user, 'nickname', '')}
          </div>
          {isUploader && menuOpened && (
            <div className="text-truncate h6 mb-auto">
              <PrettyBytes bytes={get(user, 'diskUsage')} /> /{' '}
              <PrettyBytes bytes={get(user, 'diskSpace')} />
            </div>
          )}
          <div className="text-truncate h6 mb-0">
            {/* eslint-disable-next-line no-script-url */}
            <a href="#" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
        {loading && <VisibleContainerLoader size="sm" />}
      </MenuItem>
    );
  }
}

export default MenuUser;
