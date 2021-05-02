import React, { ReactNode } from 'react';
import cl from 'classnames';
import { components, OptionProps } from 'react-select';
import { ReactComponent as Film } from 'feather-icons/dist/icons/film.svg';
import { MovieResultType } from '../../../../../types/GlobalSearchResultTypes';
import ImdbImage from '../../../../presentationals/imdbImage';

import styles from './MovieOption.module.scss';

const { Option: BaseOption } = components;

const MovieOption = (props: OptionProps<MovieResultType, false>): ReactNode => {
  const { data }: { data: MovieResultType } = props;
  const { releaseDate } = data;

  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;
  return (
    <BaseOption {...props}>
      <div className={styles.option}>
        <ImdbImage
          type="poster"
          size={2}
          alt={data.name}
          path={data.posterPath}
          configuration={props.selectProps.metadataConfiguration}
          className={cl('border-radius d-none d-sm-block', styles.optionImage)}
        />
        <div>
          <h6 className={cl('font-weight-bold', styles.optionCategory)}>
            <Film className={styles.optionCategoryIcon} />
            Movie
          </h6>
          <h5>
            {data.name}&nbsp;
            {year && `(${year})`}
          </h5>
          <div className={styles.optionOverview}>{data.overview}</div>
        </div>
      </div>
    </BaseOption>
  );
};

export default MovieOption;
