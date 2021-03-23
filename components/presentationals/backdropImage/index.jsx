import React from 'react';
import cl from 'classnames';
import PropTypes from 'prop-types';

import styles from './style.module.scss';
import getImdbSrc from '../imdbImage/getImdbSrc';

const BackdropImage = ({ configuration, type, size = 0, path, children }) => (
  <div
    className={cl(styles.backdrop)}
    style={{
      backgroundImage:
        path && `url(${getImdbSrc(configuration, type, size, path)})`,
    }}
  >
    {children}
  </div>
);

BackdropImage.propTypes = {
  configuration: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
  path: PropTypes.string,
  children: PropTypes.any,
};

export default BackdropImage;
