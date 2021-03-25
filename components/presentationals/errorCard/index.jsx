import React from 'react';
import PropTypes from 'prop-types';

import CardBody from '../card/cardBody';
import messages from './messages';
import Card from '../card/card';

const ErrorCard = ({
  title,
  status,
  message: givenMessage,
  children,
  ...props
}) => (
  <Card {...props}>
    <CardBody>
      <h1 className="h2">{title || status || 'Error unknown'}</h1>
      <p className="text-muted">
        {givenMessage ||
          (messages[`${status}`] ? messages[`${status}`] : messages.unknown)}
      </p>
      {children}
    </CardBody>
  </Card>
);

ErrorCard.propTypes = {
  title: PropTypes.any,
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  message: PropTypes.any,
  children: PropTypes.any,
};

export default ErrorCard;
