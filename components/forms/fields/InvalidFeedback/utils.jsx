import isEmpty from 'lodash/isEmpty';
import React from 'react';
import messages from './messages';

export const displayError = error => {
  if (typeof error === 'string') {
    return error;
  }
  if (typeof error === 'object' && error.translatable) {
    return error.message; // intl.formatMessage(error.message, error.values);
  }
  if (error) {
    return messages.unknown; // intl.formatMessage(messages.unknown);
  }

  return null;
};

export const renderErrors = errors => {
  if (Array.isArray(errors)) {
    return errors.map((e, key) => (
      <div key={key.toString()}>{displayError(e)}</div>
    ));
  }
  if (isEmpty(!errors)) {
    return <div>{displayError(errors)}</div>;
  }

  return null;
};
