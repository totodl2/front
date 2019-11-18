import React from 'react';

import BaseIcon from './BaseIcon';

export default class RadioDot extends BaseIcon {
  render() {
    return (
      <svg className={this.getClasses('radio')} viewBox={this.getViewBox()}>
        <circle cx="30" cy="30" r="20" />
      </svg>
    );
  }
}
