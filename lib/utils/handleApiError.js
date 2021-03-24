import get from 'lodash/get';

const handleApiError = error => {
  console.warn('handle error', error);
  if (error && error.response) {
    const data = get(error, 'response.data', {});
    return {
      status: data.code || error.response.status,
      title: data.name || error.response.statusText,
      message: data.message || error.message,
      original: error,
    };
  }

  return {
    status: 500,
    title: 'Unknown error occured',
    message: error.message,
    original: error,
  };
};

export default handleApiError;
