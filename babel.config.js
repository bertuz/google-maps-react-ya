module.exports = function (api) {
  api.cache(true);

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-flow',
  ];

  const plugins = [];

  if (process.env.ENV === 'prod') {
    plugins.push('transform-remove-console');
  }

  return {
    presets,
    plugins,
  };
};
