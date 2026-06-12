module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  env: {
    node: true,
    es2022: true
  },
  plugins: ["@typescript-eslint", "prettier", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "prettier/prettier": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-unused-vars": "warn"
  }
};