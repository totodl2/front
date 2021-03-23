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
      ...props
    },
    ref,
  ) => (
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
        <h5>{title}</h5>
      </div>
    </View>
  ),
);

Movie.propTypes = {
  view: PropTypes.any,
  className: PropTypes.string,
  configuration: PropTypes.object.isRequired,
  posterPath: PropTypes.string,
  title: PropTypes.string.isRequired,
  hoverable: PropTypes.bool,
};

export default Movie;
