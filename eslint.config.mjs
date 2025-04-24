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
