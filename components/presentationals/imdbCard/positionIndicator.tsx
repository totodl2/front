import React, { ReactNode } from 'react';
import cl from 'classnames';

import styles from './positionIndicator.module.scss';

interface PositionIndicatorProps {
  position: number;
  length: number;
  className?: string;
}

const PositionIndicator = ({
  className,
  position,
  length,
}: PositionIndicatorProps): ReactNode => (
  <div className={cl(className, styles.positionIndicator)}>
    <div
      className={styles.positionIndicatorProgress}
      style={{ width: `${(position / length) * 100}%` }}
    />
  </div>
);

export default PositionIndicator;
