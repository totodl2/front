import isInvalid from './isInvalid';

/**
 * Must be valid when the form is touched or dirty
 * and when there is no errors
 * @param meta
 * @return {Boolean|undefined}
 */
const isValid = meta => {
  const isActive = meta.touched || !meta.pristine;
  const invalid = isInvalid(meta);

  if (isActive) {
    return !invalid;
  }

  return undefined;
};

export default isValid;
