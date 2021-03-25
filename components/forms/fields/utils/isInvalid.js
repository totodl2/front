/**
 * Must me displayed when the form is touched or dirty
 * and when there is a validation error or a submission error but
 * not be invalid when there is a submission error and the field is modified after
 * the submission
 * @param meta
 * @return {Boolean|undefined}
 */
const isInvalid = meta => {
  const isActive = meta.touched || !meta.pristine;

  if (isActive && meta.error) {
    return meta.invalid;
  }

  if (isActive && meta.submitFailed) {
    return meta.modifiedSinceLastSubmit ? undefined : meta.invalid;
  }

  return undefined;
};

export default isInvalid;
