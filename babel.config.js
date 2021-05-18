module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', { targets: { node: true } }],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};
