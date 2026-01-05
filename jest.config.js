export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'json'],
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'routes/**/*.js',
    '!routes/index.js',
    '!**/node_modules/**'
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  verbose: true,
  forceExit: true,           // ✅ Already there - helps with this
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  testTimeout: 10000,        // ✅ Add this - gives tests more time
  detectOpenHandles: false   // ✅ Add this - suppresses the warning
};
