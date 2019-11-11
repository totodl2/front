/**
 * Validate an email field
 * @param  {string}           value value to check
 * @param  {object}           [props] props received by forms. Should contain an `intl` object
 * @return {string|undefined}       error message if any
 */

export const validateEmail = (value) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return 'Invalid email';
  }
  return undefined;
};

export default validateEmail;
