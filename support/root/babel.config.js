const config = require('../base.babel');

module.exports = {
  ...config,
  babelrcRoots: [
    '.',
    'packages/bibio__*',
    'packages/*',
    'website/.babelrc.js',
    'support/storybook/.babelrc.js',
  ],
  sourceType: 'unambiguous',
};
