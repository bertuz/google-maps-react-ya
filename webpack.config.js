const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

module.exports = (env) => {
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const config = require(`./webpack.${env}`);
  return merge(commonConfig, config);
};
