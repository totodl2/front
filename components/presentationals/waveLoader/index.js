import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import classes from './index.module.scss';

const WaveLoader = ({ className, fill, color, visible }) => (
  <div
    className={cl(classes.waves, className, classes[`waves--${fill}`], {
      [classes.wavesVisible]: visible,
    })}
  >
    <div
      className={cl(classes.wave, classes[`wave--${color}`], classes.waveOne)}
    />
    <div
      className={cl(classes.wave, classes[`wave--${color}`], classes.waveTwo)}
    />
    <div
      className={cl(classes.wave, classes[`wave--${color}`], classes.waveThree)}
    />
  </div>
);

WaveLoader.propTypes = {
  fill: PropTypes.oneOf(['container', 'page']),
  color: PropTypes.string,
  visible: PropTypes.bool,
  className: PropTypes.string,
};

WaveLoader.defaultProps = {
  fill: 'container',
};

export default WaveLoader;
