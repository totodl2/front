import React from 'react';
import { X } from 'react-feather';
import videojs from 'video.js';
import cl from 'classnames';
import * as ReactDOMServer from 'react-dom/server';
import styles from './style.module.scss';

const Component = videojs.getComponent('Component');
const NAME = 'TitleBar';

const TitleBar = videojs.extend(Component, {
  constructor(player, options) {
    // eslint-disable-next-line prefer-rest-params
    Component.apply(this, arguments);

    this.updateContent(options);
  },

  createEl() {
    return videojs.dom.createEl('div', {
      className: styles.header,
    });
  },

  updateContent({ title, onClose }) {
    videojs.dom.emptyEl(this.el());
    if (title) {
      const titleEl = videojs.dom.createEl('div', {
        className: cl('text-truncate', styles.headerTitle),
      });
      titleEl.innerText = title;
      videojs.dom.appendContent(this.el(), titleEl);
    }

    if (onClose) {
      const closeBtnEl = videojs.dom.createEl(
        'button',
        {
          className: cl('btn btn-round btn-outline-white', styles.headerClose),
        },
        { type: 'button' },
      );
      closeBtnEl.onclick = onClose;
      closeBtnEl.innerHTML = ReactDOMServer.renderToString(<X />);
      videojs.dom.appendContent(this.el(), closeBtnEl);
    }
  },
});

videojs.registerComponent(NAME, TitleBar);
export default NAME;
