import perfectionist from "eslint-plugin-perfectionist";
import stylistic from "@stylistic/eslint-plugin";
import svelte from "eslint-plugin-svelte";
import ts from "typescript-eslint";
import globals from "globals";
import js from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Formatting
  stylistic.configs["recommended-flat"],
  perfectionist.configs["recommended-line-length"],

  // Linting
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],

  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    languageOptions: { parserOptions: { parser: ts.parser } },
    files: ["**/*.svelte"] },
  { ignores: ["build/", ".svelte-kit/"] },
  {
    rules: {
      "no-restricted-syntax": ["error",
        {
          selector: "FunctionExpression[generator=false]:not(:has(ThisExpression)):not(Property[kind='get'] > .value):not(Property[kind='set'] > .value)",
          message: "FunctionExpression: Arrow functions preferred",
        },
        {
          selector: "FunctionDeclaration[generator=false]:not(:has(ThisExpression)):not(MethodDefinition[kind='get'] > .value):not(MethodDefinition[kind='set'] > .value)",
          message: "FunctionDeclaration: Arrow functions preferred",
        },
      ],
      "@typescript-eslint/no-unused-expressions": ["error", { allowTernary: true }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@stylistic/max-statements-per-line": ["error", { max: 3 }],
      "@stylistic/member-delimiter-style": ["error", {}], // {} overrides recommended-flat config with default.
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
    },
  },
];
