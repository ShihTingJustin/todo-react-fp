// craco.config.js (in root)
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  webpack: {
    alias: {
      '@Assets': path.resolve(__dirname, 'src/assets'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Hooks': path.resolve(__dirname, 'src/hooks'),
      '@Interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@Pages': path.resolve(__dirname, 'src/pages'),
      '@Routes': path.resolve(__dirname, 'src/routes'),
      '@Redux': path.resolve(__dirname, 'src/redux'),
      '@Services': path.resolve(__dirname, 'src/services'),
      '@Sagas': path.resolve(__dirname, 'src/redux/sagas'),
      '@Slices': path.resolve(__dirname, 'src/redux/slices'),
      '@Utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      testEnvironment: 'jest-environment-jsdom',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
  },
};
