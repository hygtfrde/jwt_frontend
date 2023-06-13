const path = require('path');

module.exports = function override(config, env) {
  // Add alias configuration
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src/'),
    '~': path.resolve(__dirname, '../')
    // other aliases
  };

  return config;
};