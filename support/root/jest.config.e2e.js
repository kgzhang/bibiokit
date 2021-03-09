const config = require('../jest/jest.config');
const { jestSupportDir } = require('../jest/helpers');

const environment = {
  detox: {},
  spectron: {},
  appium: {},
}[E2E_ENVIRONMENT];

const {
  clearMocks,
  verbose,
  moduleFileExtensions,
  globals,
  transform,
  testPathIgnorePatterns,
  moduleNameMapper,
} = config;

/** @type Partial<import("@jest/types").Config.InitialOptions> */
module.exports = {
  clearMocks,
  verbose,
  moduleFileExtensions,
  transform,
  testPathIgnorePatterns,
  moduleNameMapper,
  globals: { ...globals, __SERVER__, __E2E__: true },
  cacheDirectory: '<rootDir>/.jest',
  modulePathIgnorePatterns: ['node_modules'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  displayName: {
    name: 'bibio:e2e',
    color: 'black',
  },
  testMatch: __SERVER__.testMatch,
  ...environment,
};
