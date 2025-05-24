const nextJest = require('next/jest');

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/context/(.*)$': '<rootDir>/src/context/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    // Handle image imports
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/out/',
  ],
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/dist/',
    '/.next/',
    '/out/',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{js,jsx,ts,tsx}',
  ],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  transformIgnorePatterns: [
    '/node_modules/(?!.*\\.mjs$)',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
