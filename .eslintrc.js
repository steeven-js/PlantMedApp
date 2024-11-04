module.exports = {
  root: true,
  extends: [
    '@react-native/eslint-config',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'react-native',
    'unused-imports',
    'perfectionist',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  rules: {
    // General
    'no-console': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'no-use-before-define': 0,

    // TypeScript
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],

    // React
    'react/function-component-definition': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,

    // React Hooks
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',

    // React Native
    'react-native/no-color-literals': 0,
    'react-native/no-inline-styles': 0,
    'react-native/no-unused-styles': 0,

    // Import
    'import/extensions': 0,
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,

    // Unused imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 0,

    // Perfectionist - Sort Imports
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        newlinesBetween: 'always',
        groups: [
          'style',
          'type',
          'react',
          'react-native-core',
          'react-navigation',
          'redux-persist',
          'routes',
          'hooks',
          'utils',
          'components',
          'sections',
          'store',
          'screen',
          'navigation',
          ['parent', 'sibling', 'index'],
          ['parent-type', 'sibling-type', 'index-type'],
          'object',
          'unknown',
        ],
        customGroups: {
          value: {
            react: ['react', 'react-redux'],
            'react-native-core': [
              'react-native',
              'react-native-screens',
              'react-native-orientation-locker',
              'react-native-safe-area-context',
              'react-native-**',
            ],
            'react-navigation': ['@react-navigation/**'],
            'redux-persist': ['redux-persist/**'],
            'components': '@src/components/**',
            'store': '@src/store/**',
            'navigation': '@src/navigation/**',
            'hooks': '@src/hooks/**',
            'utils': '@src/utils/**',
            'sections': '@src/sections/**',
            'screen': '@src/screen/**',
            'routes': '@src/routes/**',
          },
        },
      },
    ],
  },
};
