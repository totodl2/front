import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import ImdbImage from '../imdbImage';

import styles from './style.module.scss';

const Movie = React.forwardRef(
  (
    {
      view: View = 'div',
      title,
      configuration,
      posterPath,
      className,
      hoverable,
      children,
      releaseDate,
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
          path={posterPath}
          alt={title}
          configuration={configuration}
          type="poster"
          size={2}
        />
        <div className={styles.movieFooter}>
          <h5>
            {title}
            {year ? <span className={styles.movieYear}> ({year})</span> : ''}
          </h5>
        </div>
        {children}
      </View>
    );
  },
);

Movie.propTypes = {
  children: PropTypes.any,
  view: PropTypes.any,
  releaseDate: PropTypes.string,
  className: PropTypes.string,
  configuration: PropTypes.object.isRequired,
  posterPath: PropTypes.string,
  title: PropTypes.string.isRequired,
  hoverable: PropTypes.bool,
};

export default Movie;
