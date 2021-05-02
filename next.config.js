require('dotenv').config();
const path = require('path');

module.exports = {
  target: 'serverless',
  env: {
    API_URL: process.env.API_URL,
  },
  webpack: webpackConf => {
    const {
      module: { rules },
    } = webpackConf;

    const newRules = rules.map(rule => {
      if (!rule.oneOf) {
        return rule;
      }

      return {
        ...rule,
        oneOf: rule.oneOf.map(crule => {
          if (
            !crule.test ||
            (!crule.test.toString().includes('scss') &&
              !crule.test.toString().includes('sass')) ||
            !Array.isArray(crule.use)
          ) {
            return crule;
          }

          return {
            ...crule,
            use: [
              ...crule.use.map(use => {
                // add camel case value to exported class name
                if (
                  typeof use === 'object' &&
                  use.loader &&
                  use.loader.includes('/css-loader/') &&
                  use.options.modules
                ) {
                  return {
                    ...use,
                    options: {
                      ...use.options,
                      modules: {
                        ...use.options.modules,
                        exportLocalsConvention: 'camelCase',
                      },
                    },
                  };
                }
                return use;
              }),
              {
                loader: '@epegzz/sass-vars-loader',
                options: {
                  syntax: 'scss',
                  files: [path.resolve(__dirname, 'styles/sassVariables.js')],
                },
              },
              {
                loader: require.resolve('sass-resources-loader'),
                options: {
                  resources: [path.resolve(__dirname, 'styles/variables.scss')],
                },
              },
            ],
          };
        }),
      };
    });

    newRules.push({
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            svgo: false,
            titleProp: true,
            ref: true,
          },
        },
      ],
    });

    newRules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: { limit: 10000 },
      },
    });

    return {
      ...webpackConf,
      module: {
        ...webpackConf.module,
        rules: newRules,
      },
    };
  },
  poweredByHeader: false,
};
