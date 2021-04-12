const isProd = process.env.NODE_ENV === 'production';
const defaultRules = {
  'no-bitwise': 0,
  'arrow-body-style': [2, 'as-needed'],
  'arrow-parens': ['error', 'as-needed'],
  'class-methods-use-this': 0,
  'comma-dangle': [2, 'always-multiline'],
  'import/imports-first': 0,
  'import/newline-after-import': 0,
  'import/no-dynamic-require': 2,
  'import/no-named-as-default': 0,
  'import/no-named-as-default-member': 0,
  'import/no-unresolved': 2,
  'import/prefer-default-export': 0,
  'import/no-anonymous-default-export': 1, // @todo: fix then error
  'jsx-a11y/anchor-is-valid': 0,
  'jsx-a11y/aria-props': 2,
  'jsx-a11y/click-events-have-key-events': 0,
  'jsx-a11y/heading-has-content': 0,
  'jsx-a11y/label-has-associated-control': 0,
  'jsx-a11y/label-has-for': 0,
  'jsx-a11y/mouse-events-have-key-events': 2,
  'jsx-a11y/no-static-element-interactions': 0,
  'jsx-a11y/role-has-required-aria-props': 2,
  'jsx-a11y/role-supports-aria-props': 2,
  'newline-per-chained-call': 0,
  'no-confusing-arrow': 0,
  'no-console': [isProd ? 'error' : 'warn', { allow: ['warn', 'error'] }],
  'no-debugger': isProd ? 'error' : 'warn',
  'no-plusplus': 0,
  'no-unused-vars': isProd ? 2 : 1,
  'no-use-before-define': 0,
  'prefer-template': 2,
  'prettier/prettier': 'error',
  'react/destructuring-assignment': 0,
  'react/forbid-prop-types': 0,
  'react/jsx-filename-extension': 0,
  'react/jsx-first-prop-new-line': [2, 'multiline'],
  'react/jsx-no-target-blank': 0,
  'react/jsx-one-expression-per-line': 0,
  'react/jsx-props-no-spreading': 0,
  'react/require-default-props': 0,
  'react/self-closing-comp': [
    'warn', // @todo: fix then error
    {
      component: true,
      html: true,
    },
  ],
  'react/static-property-placement': [1, 'static public field'],
  'react/state-in-constructor': 0,
  'react/react-in-jsx-scope': 0,
};

module.exports = {
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['jsx-a11y', 'prettier', '@typescript-eslint'],
      extends: [
        'airbnb',
        'prettier',
        'prettier/react',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      env: {
        es6: true,
        browser: true,
        jest: true,
        node: true,
      },
      rules: {
        ...defaultRules,
        'no-shadow': 0,
        'no-unused-vars': 0,
        'react/display-name': 0,
        'react/prop-types': 0,
        'react/forbid-prop-types': 1,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/indent': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': isProd ? 2 : 1,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-use-before-define': 0,
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      parser: 'babel-eslint',
      extends: ['airbnb', 'prettier', 'prettier/react'],
      env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
      },
      rules: defaultRules,
      plugins: ['react', 'jsx-a11y', 'prettier'],
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
    },
  ],
};
