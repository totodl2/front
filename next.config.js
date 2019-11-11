require('dotenv').config();
const withSass = require('@zeit/next-sass');
const path = require('path');
const {
  getLocalIdent: defaultGetLocalIdent,
} = require('css-loader/dist/utils');

module.exports = {
  target: 'serverless',
  ...withSass({
    cssModules: true,
    cssLoaderOptions: {
      getLocalIdent: (loaderContext, localIdentName, localName, options) => {
        const fileName = path.basename(loaderContext.resourcePath);
        const shoudTransform = /.module.(scss|sass)+$/i.test(fileName);

        if (!shoudTransform) {
          return localName;
        }

        return defaultGetLocalIdent(
          loaderContext,
          localIdentName,
          localName,
          options,
        );
      },
    },
    webpack: config => {
      config.module.rules.forEach(rule => {
        if (
          (!rule.test.toString().includes('scss') &&
            !rule.test.toString().includes('sass')) ||
          !Array.isArray(rule.use)
        ) {
          return;
        }

        rule.use.push({
          loader: '@epegzz/sass-vars-loader',
          options: {
            syntax: 'scss',
            files: [path.resolve(__dirname, 'styles/variables.json')],
          },
        });

        rule.use.push({
          loader: require.resolve('sass-resources-loader'),
          options: {
            resources: [path.resolve(__dirname, 'styles/_variables.scss')],
          },
        });
      });
      return config;
    },
  }),
  env: {
    API_URL: process.env.API_URL,
  },
  poweredByHeader: false,
};
