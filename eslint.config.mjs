import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        test: true,
        expect: true,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "no-useless-escape": "off"
    },
  },
];

