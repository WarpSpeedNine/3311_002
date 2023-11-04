module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // ... other rules
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
