import React from 'react';
import { InnerRef, PropsWithInnerRef } from 'react-select';
import ReactSelectAsync, { Props } from 'react-select/async';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src/types';
import { StylesConfig } from 'react-select/src/styles';

import styles from './styles';

type AsyncProps<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean,
  GroupType extends GroupTypeBase<OptionType> = GroupTypeBase<OptionType>
> = Props<OptionType, IsMulti, GroupType> & PropsWithInnerRef;

const SelectAsync = React.forwardRef(
  <
    OptionType extends OptionTypeBase,
    IsMulti extends boolean,
    GroupType extends GroupTypeBase<OptionType> = GroupTypeBase<OptionType>
  >(
    props: AsyncProps<OptionType, IsMulti, GroupType>,
    ref: InnerRef,
  ) => (
    <ReactSelectAsync
      styles={
        (styles as unknown) as StylesConfig<OptionType, IsMulti, GroupType>
      }
      {...props}
      ref={ref}
    />
  ),
);

export default SelectAsync;
