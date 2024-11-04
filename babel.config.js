module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@src': './src',
          '@components': './src/components',
          '@constants': './src/constants',
          '@custom': './src/custom',
          '@data': './src/data',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@store': './src/store',
          '@text': './src/text',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
