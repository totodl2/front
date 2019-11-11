/**
 * Validate length of fields
 * @param  {string}           value value to check
 * @param  {object}           props props received by forms. Should contain an `intl` object
 * @param  {object}           rules define operator & expected length used to check validity
 * @return {string|undefined}       error message if any
 */

const validateLength = (value, props, rules) => {
  const { operator, expectedLength } = rules;
  if (value) {
    if (operator === 'lt' && value.length >= expectedLength) {
      return `This field can't contain more than ${expectedLength -
        1} characters`;
    }
    if (operator === 'le' && value.length > expectedLength) {
      return `This field can't contain more then ${expectedLength} characters`;
    }
    if (operator === 'eq' && value.length !== expectedLength) {
      return `This field must contain ${expectedLength} characters`;
    }
    if (operator === 'gt' && value.length <= expectedLength) {
      return `This field must contain at least ${expectedLength +
        1} characters`;
    }
    if (operator === 'ge' && value.length < expectedLength) {
      return `This field must contain at least ${expectedLength} characters`;
    }
  }
  return undefined;
};

export const validateLengthFactory = rules => (value, allValues, props) =>
  validateLength(value, props, rules);

export default validateLength;
