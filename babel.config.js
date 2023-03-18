module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',

          '@navigation': './scr/navigation',
          '@assets': './src/assets',
          '@actions': './src/store/slices',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@constants': './src/constants',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
