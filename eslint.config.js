import perfectionist from "eslint-plugin-perfectionist";
import tailwind from "eslint-plugin-readable-tailwind";
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
  { plugins: { "readable-tailwind": tailwind } },

  // Linting
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],

  {
    languageOptions:
    {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { parser: ts.parser },
    },
    files: ["**/*.svelte"],
  },
  { ignores: ["build/", ".svelte-kit/"] },
  {
    rules: {
      ...tailwind.configs.error.rules,
      "no-restricted-syntax": ["error",
        {
          selector: "FunctionExpression[generator=false]:not(:has(ThisExpression)):not(Property[kind='get'] > .value):not(Property[kind='set'] > .value)",
          message: "FunctionExpression: Arrow functions preferred",
        },
        {
          /* eslint-disable-next-line */
          selector: "FunctionDeclaration[generator=false]:not(:has(ThisExpression)):not(MethodDefinition[kind='get'] > .value):not(MethodDefinition[kind='set'] > .value)",
          message: "FunctionDeclaration: Arrow functions preferred",
        },
      ],
      "readable-tailwind/multiline": ["error", { preferSingleLine: true, printWidth: 999 }],
      "@typescript-eslint/no-unused-expressions": ["error", { allowTernary: true }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@stylistic/max-statements-per-line": ["error", { max: 3 }],
      "@stylistic/member-delimiter-style": ["error", {}], // {} overrides recommended-flat config with default.
      "@stylistic/max-len": ["error", { code: 160 }],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
    },
  },
];
