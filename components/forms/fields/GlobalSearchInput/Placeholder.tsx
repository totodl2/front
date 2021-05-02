import React, { ReactNode } from 'react';
import { components, PlaceholderProps } from 'react-select';
import { AllGlobalSearchResultTypes } from '../../../../types/GlobalSearchResultTypes';

const { Placeholder: BasePlaceholder } = components;

const Placeholder = (
  props: PlaceholderProps<AllGlobalSearchResultTypes, false>,
): ReactNode => (
  <BasePlaceholder {...props} className="text-truncate pr-2 w-100" />
);

export default Placeholder;
