require('dotenv').config();
const withSass = require('@zeit/next-sass');

module.exports = {
  target: 'serverless',
  ...withSass({ cssModules: true }),
  env: {
    API_URL: process.env.API_URL,
  },
  poweredByHeader: false,
};
