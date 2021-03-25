class UploadError extends Error {
  constructor(errors, ...args) {
    super(...args);
    this.errors = errors;
  }
}

export default UploadError;
