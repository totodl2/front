const validateRequired = value =>
  value === undefined ||
  value === '' ||
  value === null ||
  (Array.isArray(value) && value.length <= 0)
    ? 'This field is required'
    : undefined;

export default validateRequired;
