import get from 'lodash/get';

import createRandom from '../../lib/createRandom';
export const TYPE_SET_CONFIGURATION = 'metadata/configuration/set';
export const TYPE_START_LOADING_CONFIGURATION =
  'metadata/configuration/startLoading';
export const TYPE_STOP_LOADING_CONFIGURATION =
  'metadata/configuration/stopLoading';

const startLoadingConfiguration = loadingKey => ({
  loadingKey,
  type: TYPE_START_LOADING_CONFIGURATION,
});

const stopLoadingConfiguration = loadingKey => ({
  loadingKey,
  type: TYPE_STOP_LOADING_CONFIGURATION,
});

export const setConfiguration = data => ({
  type: TYPE_SET_CONFIGURATION,
  data,
});

export const getConfiguration = (forceReload = false) => async (
  dispatch,
  getState,
  api,
) => {
  const conf = get(getState(), 'metadataConfiguration', {});
  if (!forceReload && (conf.images !== undefined || conf.loading)) {
    return conf;
  }

  const loadingKey = createRandom(12);
  dispatch(startLoadingConfiguration(loadingKey));
  try {
    const { data } = await api.metadata.configuration();
    dispatch(setConfiguration(data));
    return data;
  } finally {
    dispatch(stopLoadingConfiguration(loadingKey));
  }
};
