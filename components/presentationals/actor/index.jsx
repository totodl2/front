import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import ImdbImage from '../imdbImage';

import styles from './style.module.scss';

const Actor = ({ character, configuration, person, className }) => (
  <div className={cl(styles.actor, className)}>
    <ImdbImage
      className={styles.actorImage}
      path={person.profilePath}
      alt={person.name}
      configuration={configuration}
      type="profile"
      size={2}
    />
    <div className={styles.actorFooter}>
      <h5 className="text-truncate">{person.name}</h5>
      <h6 className="text-truncate">{character}</h6>
    </div>
  </div>
);

Actor.propTypes = {
  className: PropTypes.string,
  configuration: PropTypes.object.isRequired,
  character: PropTypes.string.isRequired,
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profilePath: PropTypes.string,
  }).isRequired,
};

export default Actor;
