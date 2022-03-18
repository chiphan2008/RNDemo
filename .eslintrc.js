module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'no-console': ['warn', {allow: ['info', 'warn', 'error']}],
    'no-plusplus': 0,
    'prefer-destructuring': ['warn', {object: true, array: false}],
    'no-underscore-dangle': 0,
    'react-hooks/exhaustive-deps': 0,
    radix: 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/media-has-caption': 0,
  },
};
