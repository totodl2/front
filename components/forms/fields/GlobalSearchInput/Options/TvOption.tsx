import React, { ReactNode } from 'react';
import cl from 'classnames';
import { components, OptionProps } from 'react-select';
import { ReactComponent as Tv } from 'feather-icons/dist/icons/tv.svg';
import { TvResultType } from '../../../../../types/GlobalSearchResultTypes';
import ImdbImage from '../../../../presentationals/imdbImage';

import styles from './TvOption.module.scss';

const { Option: BaseOption } = components;

const TvOption = (props: OptionProps<TvResultType, false>): ReactNode => {
  const { data }: { data: TvResultType } = props;
  const { lastAirDate } = data;

  const year = lastAirDate ? new Date(lastAirDate).getFullYear() : null;
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
            <Tv className={styles.optionCategoryIcon} />
            Tv show
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

export default TvOption;
