module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/testSetup/fileTransformer.js',
  },
  moduleDirectories: ['node_modules', 'testSetup', __dirname],
  coveragePathIgnorePatterns: ['node-modules'],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/index.ts", "!src/**/styles.ts", "!src/**/global.styles.ts", "!src/**/*.d.ts"],
};
