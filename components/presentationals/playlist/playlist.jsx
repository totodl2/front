import React, { memo } from 'react';
import cl from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.module.scss';
import PlaylistItem from './playlistItem';

const Playlist = ({ className, children }) => (
  <div className={cl(className, styles.playlist)}>
    {children}
    <PlaylistItem disabled className={styles.playlistItemPlaceholder} />
  </div>
);

Playlist.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default memo(Playlist);
