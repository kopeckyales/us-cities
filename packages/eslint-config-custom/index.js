module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["node_modules", "dist", ".eslintrc.js"],
};
