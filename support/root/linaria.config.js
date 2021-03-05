/**
 * @type {import('@linaria/babel-preset').StrictOptions}
 */
const config = {
  evaluate: true,
  displayName: true,
  classNameSlug: (_hash, title) => {
    return `bibio-${title.toLowerCase().split('_').join('-')}`;
  },
  babelOptions: require('../base.babel'),
  rules: [
    {
      action: require('@linaria/shaker').default,
    },
    {
      action: 'ignore',
      test: (modulePath) => {
        return /node_modules/.test(modulePath) && !/node_modules\/(@?bibio)/.test(modulePath);
      },
    },
  ],
};

module.exports = config;
