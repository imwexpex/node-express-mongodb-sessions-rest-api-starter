module.exports = {
  plugins: [
    'source-map-support',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          '@app': './app',
          '@models': './app/models',
          '@middleware': './app/middleware',
          '@utils': './app/utils',
          '@controllers': './app/controllers',
          '@services': './app/services',
          '@constants': './app/constants',
        },
      },
    ],
  ],
};
