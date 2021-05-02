import React, { ReactNode } from 'react';
import cl from 'classnames';
import { components, OptionProps } from 'react-select';
import Link from 'next/link';

import { FileResultType } from '../../../../../types/GlobalSearchResultTypes';
import styles from './FileOption.module.scss';
import ExtensionIcon from '../../../../presentationals/torrentCard/files/extensionIcon';

const { Option: BaseOption } = components;

const FileOption = ({
  innerProps: defaultInnerProps,
  ...props
}: OptionProps<FileResultType, false>): ReactNode => {
  const { data }: { data: FileResultType } = props;
  const { onClick: defaultOnClick, ...innerProps } = defaultInnerProps;
  const onClick = (evt: any) => {
    if (evt.target && evt.target.matches('a')) {
      props.setValue(null, 'deselect-option', data);
      return;
    }
    defaultOnClick(evt);
  };

  return (
    <BaseOption {...props} innerProps={{ onClick, ...innerProps }}>
      <div className={styles.option}>
        <h6 className={cl('font-weight-bold', styles.optionCategory)}>
          <ExtensionIcon
            ext={data.extension}
            className={styles.optionCategoryIcon}
          />
          {data.extension} File
        </h6>
        <h5 className="text-break">{data.name}</h5>
        <div className="text-muted text-truncate">
          Torrent&nbsp;
          <Link passHref href="/in/[hash]" as={`/in/${data.hash}`}>
            <a className="text-gray-800">{data.torrentName}</a>
          </Link>
        </div>
      </div>
    </BaseOption>
  );
};

export default FileOption;
