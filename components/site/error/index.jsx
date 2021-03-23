import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft } from 'react-feather';
import Link from 'next/link';

import messages from './messages';
import Card from '../../presentationals/card/card';
import CardBody from '../../presentationals/card/cardBody';

const ErrorPage = ({ status, title, message: givenMessage }) => (
  <div className="container-fluid my-5">
    <div className="row">
      <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-9 mx-auto">
        <Card>
          <CardBody withFatPadding>
            <h1>{title || status || 'Error unknown'}</h1>
            <p className="mb-4 text-muted">
              {givenMessage ||
                (messages[`${status}`]
                  ? messages[`${status}`]
                  : messages.unknown)}
            </p>
            <Link href="/in">
              <a className="btn btn-primary">
                <ChevronLeft className="mr-2 icon" />
                Back
              </a>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  </div>
);

ErrorPage.propTypes = {
  title: PropTypes.element,
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  message: PropTypes.element,
};

export default ErrorPage;
