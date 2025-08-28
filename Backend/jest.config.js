module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/index.js',
    '!**/node_modules/**'
  ],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testTimeout: 60000, // Increase timeout for database operations
  maxWorkers: 1, // Run tests serially to avoid database conflicts
  forceExit: true, // Force Jest to exit after tests complete
  detectOpenHandles: true // Detect async operations that prevent Jest from exiting
};
