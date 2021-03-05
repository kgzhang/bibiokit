const reporters = ['default'];

if (process.env.CI === 'true') {
  reporters.push('jest-github-reporter');
}

module.exports = {
  ...require('../jest/jest.config'),
  coverageThreshold: {
    global: {
      statements: 50,
      functions: 50,
      lines: 50,
    },
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/*.dts.ts',
    '!**/theme-styles.ts',
    '!**/styles.ts',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/__dts__/**',
    '!**/__fixtures__/**',
    '!support/**',
    '!examples/**',
    '!website/**',

    // Deprecated packages
    '!deprecated/**',
  ],
  coverageReporters: ['json', 'lcov', 'text-summary', 'clover'],
  collectCoverage: true,
  reporters,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  testRunner: 'jest-circus/runner',
  testPathIgnorePatterns: ['/node_modules/'],
};
