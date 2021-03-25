import placeholder from './placholder.svg';

const getImdbSrc = (configuration, type, size, path) => {
  if (!path) {
    return placeholder;
  }

  const baseUrl = configuration.images.secureBaseUrl;
  const sizes = configuration.images[`${type}Sizes`];
  if (!sizes || sizes.length <= size) {
    throw new Error(`Invalid size ${size} for ${type}`);
  }

  return `${baseUrl}${sizes[size]}${path}`;
};

export default getImdbSrc;