/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  setupFiles: ['./setupJestMock.ts'],
  moduleDirectories: ['node_modules', __dirname],
  moduleNameMapper: {
    '@libs/(.*)': '<rootDir>/src/libs/$1',
    '@functions/(.*)': '<rootDir>/src/functions/$1'
  }
};