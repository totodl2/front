import React from 'react';

import BaseIcon from './BaseIcon';

export default class User extends BaseIcon {
  static defaultProps = {
    viewBox: '0 0 24 24',
  };

  render() {
    return (
      <svg
        className={this.getClasses('upload')}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox={this.getViewBox()}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }
}
