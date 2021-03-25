const composeValidators = (...validators) => (...params) =>
  validators.reduce(
    (error, validator) => error || validator(...params),
    undefined,
  );
export default composeValidators;
