import React from 'react';

import BaseIcon from './BaseIcon';

export default class DetailNotAvailableIcon extends BaseIcon {
  render() {
    return (
      <svg className={this.getClasses('clock')} viewBox={this.getViewBox()}>
        <rect y="26.63" width="60" height="6.75" />
      </svg>
    );
  }
}
