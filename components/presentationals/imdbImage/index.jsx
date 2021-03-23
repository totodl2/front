import React from 'react';
import PropTypes from 'prop-types';
import getSrc from './getImdbSrc';

const ImdbImage = ({ configuration, type, alt, size = 0, path, ...props }) => (
  <img src={getSrc(configuration, type, size, path)} alt={alt} {...props} />
);

ImdbImage.propTypes = {
  configuration: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
  path: PropTypes.string,
  alt: PropTypes.string.isRequired,
};

export default ImdbImage;
