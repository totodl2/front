import PropTypes from 'prop-types';
import cl from 'classnames';
import { renderErrors } from '../InvalidFeedback/utils';

const FormErrors = ({ errors, className }) => {
  const out = errors ? renderErrors(errors) : null;

  if (!out) {
    return null;
  }

  return <div className={cl('alert alert-danger mb-0', className)}>{out}</div>;
};

FormErrors.propTypes = {
  className: PropTypes.string,
  errors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
};

export default FormErrors;
