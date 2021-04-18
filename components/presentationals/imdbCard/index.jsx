import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import ImdbImage from '../imdbImage';
import PositionIndicator from './positionIndicator';

import styles from './style.module.scss';

const ImdbCard = React.forwardRef(
  (
    {
      view: View = 'div',
      title,
      configuration,
      posterPath,
      stillPath,
      className,
      hoverable,
      children,
      releaseDate,
      position,
      length,
      ...props
    },
    ref,
  ) => {
    const year = releaseDate ? new Date(releaseDate).getFullYear() : null;

    return (
      <View
        {...props}
        ref={ref}
        className={cl(styles.movie, className, {
          [styles.movieHoverable]: hoverable,
        })}
      >
        <ImdbImage
          className={styles.movieImage}
          path={stillPath || posterPath}
          alt={title}
          configuration={configuration}
          type={stillPath ? 'still' : 'poster'}
          size={2}
        />
        <div className={styles.movieFooter}>
          <h5>
            {title}
            {year ? <span className={styles.movieYear}> ({year})</span> : ''}
          </h5>
        </div>
        {children}
        {position && length && (
          <PositionIndicator
            className={styles.movieIndicator}
            position={position}
            length={length}
          />
        )}
      </View>
    );
  },
);

ImdbCard.propTypes = {
  children: PropTypes.any,
  view: PropTypes.any,
  releaseDate: PropTypes.string,
  className: PropTypes.string,
  configuration: PropTypes.object.isRequired,
  posterPath: PropTypes.string,
  title: PropTypes.string.isRequired,
  hoverable: PropTypes.bool,
  stillPath: PropTypes.string,
  position: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  length: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ImdbCard;
