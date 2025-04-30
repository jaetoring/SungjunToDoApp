// jest.config.js
module.exports = {
  preset: "jest-expo",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  coveragePathIgnorePatterns: [
    "/hooks/useThemeColor.ts",
    "/components/ThemedText.tsx",
  ],
};
