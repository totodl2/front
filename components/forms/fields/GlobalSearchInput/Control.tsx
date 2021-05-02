import React, { ReactNode } from 'react';
import { components, ControlProps } from 'react-select';
import { ReactComponent as Search } from 'feather-icons/dist/icons/search.svg';
import { AllGlobalSearchResultTypes } from '../../../../types/GlobalSearchResultTypes';

const { Control: BaseControl } = components;

const Control = ({
  children,
  ...props
}: ControlProps<AllGlobalSearchResultTypes, false>): ReactNode => (
  <BaseControl {...props} className="text-truncate w-100">
    <Search className="ml-3 text-muted" />
    {children}
  </BaseControl>
);

export default Control;
