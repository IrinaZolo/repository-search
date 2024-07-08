module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "@feature-sliced",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "@feature-sliced/eslint-config/rules/import-order/experimental",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "import/no-internal-modules": [
      "off",
      {
        allow: ["@/shared/ui/icons/*"],
      },
    ],
  },
};
