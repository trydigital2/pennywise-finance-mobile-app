module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        rootDir: '.',
        ignoreDeprecations: '6.0'
      }
    }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-native$': '<rootDir>/__tests__/mocks/react-native.js',
    '^@react-native-async-storage/async-storage$': '<rootDir>/__tests__/mocks/async-storage.js',
    '^@expo/vector-icons$': '<rootDir>/__tests__/mocks/vector-icons.js',
    '^@expo/vector-icons/(.*)$': '<rootDir>/__tests__/mocks/vector-icons.js'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js)']
};
