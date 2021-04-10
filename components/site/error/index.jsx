import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ChevronLeft } from 'feather-icons/dist/icons/chevron-left.svg';
import Router from 'next/router';

import ErrorCard from '../../presentationals/errorCard';

const ErrorPage = ({ status, title, message }) => (
  <div className="container-fluid my-5">
    <div className="row">
      <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-9 mx-auto">
        <ErrorCard status={status} title={title} message={message}>
          <button
            type="button"
            onClick={() => Router.back()}
            className="btn btn-primary"
          >
            <ChevronLeft className="mr-2 icon" />
            Back
          </button>
        </ErrorCard>
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
