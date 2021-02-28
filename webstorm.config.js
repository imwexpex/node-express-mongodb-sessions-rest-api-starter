/* eslint-disable */
const babelConfig = require('./babel.config');
const path = require('path');

const getBabelAlias = () => {
  const [_, { alias }] = babelConfig.plugins.find(([name]) =>
    /module-resolver/.test(name)
  );
  return Object.keys(alias).reduce(
    (acc, key) => ({ ...acc, [key]: path.resolve(__dirname, alias[key]) }),
    {}
  );
};

module.exports = {
  resolve: {
    alias: {
      ...getBabelAlias()
    }
  }
};
