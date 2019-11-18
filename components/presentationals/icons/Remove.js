import React from 'react';

import BaseIcon from './BaseIcon';

export default class AddMini extends BaseIcon {
  render() {
    return (
      <svg className={this.getClasses('remove')} viewBox={this.getViewBox()}>
        <path d="M53.7,25.3H6.3v9.4h47.4" />
      </svg>
    );
  }
}
