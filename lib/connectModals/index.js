import React from 'react';
import ModalsContainer from './ModalContainer';
import RequestCloseModal from './RequestCloseModal';

export const connectModals = modals => CustomComponent => props => (
  <ModalsContainer {...props} view={CustomComponent} modals={modals} />
);

export { ModalsContainer, RequestCloseModal };

export default connectModals;
