module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};
