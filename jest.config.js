module.exports = {
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transformIgnorePatterns: [
        '/node_modules/(?!(axios)/)', // Ensure axios and other ES modules are transformed
    ],
};
