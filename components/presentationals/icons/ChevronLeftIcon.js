import React from 'react';

import BaseIcon from './BaseIcon';

export default class ChevronLeftIcon extends BaseIcon {
  render() {
    return (
      <svg className={this.getClasses('chevron-left')} viewBox={this.getViewBox()}>
        <polygon points="41.34 1.2 47.35 7.21 24.6 29.96 47.42 52.79 41.41 58.8 12.58 29.96 41.34 1.2" />
      </svg>
    );
  }
}
