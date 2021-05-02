/* eslint-disable no-param-reassign */
const color = require('color');
const variables = require('./variables');

const mapping = {
  h1FontSize: 'h1-font-size',
  h2FontSize: 'h2-font-size',
  h3FontSize: 'h3-font-size',
  h4FontSize: 'h4-font-size',
  h5FontSize: 'h5-font-size',
  h6FontSize: 'h6-font-size',
};

const strVariables = Object.entries(variables).reduce((prev, [name, value]) => {
  if (value instanceof color) {
    prev[name] = value.string();
  } else {
    prev[name] = value;
  }
  return prev;
}, {});

module.exports = {
  ...strVariables,
  ...Object.entries(strVariables).reduce(
    (prev, [name, value]) => ({
      ...prev,
      [mapping[name] ||
      name.replace(
        /([A-Z0-9][0-9]*)/g,
        match => `-${match.toLowerCase()}`,
      )]: value,
    }),
    {},
  ),
};
