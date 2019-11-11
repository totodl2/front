import validateLength from '../validateLength';

const validatePassword = (value, allValues, props) =>
  validateLength(value, props, { operator: 'ge', expectedLength: 8 });

export default validatePassword;
