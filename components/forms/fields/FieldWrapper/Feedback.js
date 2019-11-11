import React from 'react';
import { fieldMetaPropTypes } from 'redux-form';
import PropTypes from 'prop-types';
import InvalidFeedback from '../InvalidFeedback';

const Feedback = ({ className, meta }) => (
  <InvalidFeedback className={className} meta={meta} />
);

Feedback.propTypes = {
  className: PropTypes.string,
  meta: PropTypes.shape(fieldMetaPropTypes),
};

export default Feedback;
