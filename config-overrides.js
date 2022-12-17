const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = function override(config, env) {
  const rules = config.module.rules
    .find((rule) => typeof rule.oneOf === 'object')
    .oneOf.filter((rule) => Array.isArray(rule.use));

  rules.forEach((rule) => {
    rule.use.forEach((moduleLoader) => {
      if (moduleLoader.loader?.includes('resolve-url-loader'))
        moduleLoader.options.sourceMap = false;
    });
  });

  config.resolve.alias = {
    ...config.resolve.alias,
    '@Constants': resolve('src/constants'),
    '@Components': resolve('src/components'),
    '@Hooks': resolve('src/hooks'),
    '@Interfaces': resolve('src/interfaces'),
    '@Pages': resolve('src/pages'),
    '@Routes': resolve('src/routes'),
    '@Redux': resolve('src/redux'),
    '@Services': resolve('src/services'),
    '@Sagas': resolve('src/redux/sagas'),
    '@Slices': resolve('src/redux/slices'),
    '@Utils': resolve('src/utils')
  };

  return config;
};
