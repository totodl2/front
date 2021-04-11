const validateNumber = value => {
  if (value && !/^[0-9]+$/i.test(value)) {
    return 'Invalid number';
  }
  return undefined;
};

export default validateNumber;
