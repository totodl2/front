import React, { ReactNode } from 'react';
import cl from 'classnames';
import { components, OptionProps } from 'react-select';
import { ReactComponent as Activity } from 'feather-icons/dist/icons/activity.svg';
import { TorrentResultType } from '../../../../../types/GlobalSearchResultTypes';

import styles from './TorrentOption.module.scss';

const { Option: BaseOption } = components;

const TorrentOption = (
  props: OptionProps<TorrentResultType, false>,
): ReactNode => {
  const { data }: { data: TorrentResultType } = props;
  return (
    <BaseOption {...props}>
      <div className={styles.option}>
        <h6 className={cl('font-weight-bold', styles.optionCategory)}>
          <Activity className={styles.optionCategoryIcon} />
          Torrent
        </h6>
        <h5 className="text-break">{data.name}</h5>
        {data.uploader && (
          <div className="text-muted">Uploaded by {data.uploader}</div>
        )}
      </div>
    </BaseOption>
  );
};

export default TorrentOption;
