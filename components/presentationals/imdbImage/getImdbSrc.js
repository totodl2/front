import placeholder from './placholder.svg';

const getImdbSrc = (configuration, type, size, path) => {
  if (!path) {
    return placeholder;
  }

  const baseUrl = configuration.images.secureBaseUrl;
  const sizes = configuration.images[`${type}Sizes`];
  if (!sizes || sizes.length <= size || !sizes[size]) {
    throw new Error(
      `Invalid size ${size} for ${type}${
        sizes && sizes.length > 0
          ? ` (${sizes.map((sz, i) => `${i}: ${sz}`).join(', ')})`
          : ''
      }`,
    );
  }

  return `${baseUrl}${sizes[size]}${path}`;
};

export default getImdbSrc;
