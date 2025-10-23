module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|react-native-svg|libphonenumber-js)/)',
  ],
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|js)'],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/PhoneInput.test.tsx'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/flags/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

