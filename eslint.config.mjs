import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "./scripts/reset-project.js",
      "./tailwind.config.js",
      "./metro.config.js",
      "./hooks/useThemeColor.ts",
      "./components/ThemedText.tsx",
      "./android",
      "./__tests__/main/TodoChart.test.tsx",
      "./__tests__/main/TodoBox.test.tsx"
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  ...tseslint.configs.recommended,
]);
