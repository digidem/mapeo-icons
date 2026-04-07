const vue = require("eslint-plugin-vue");
const prettier = require("eslint-config-prettier");
const nuxt = require("eslint-plugin-nuxt");
const vueParser = require("vue-eslint-parser");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    ignores: [
      "node_modules/**",
      ".nuxt/**",
      ".output/**",
      "dist/**",
      "*.config.js",
      ".git/**",
      ".cache/**",
      ".vite/**",
    ],
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: tsParser,
        extraFileExtensions: [".vue"],
      },
      globals: {
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
      },
    },
    plugins: {
      vue,
      nuxt,
    },
    rules: {
      ...vue.configs["flat/essential"].rules,
      "vue/multi-word-component-names": 0,
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
      },
    },
    plugins: {
      nuxt,
    },
    rules: {
      "vue/multi-word-component-names": 0,
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
      },
    },
    plugins: {
      nuxt,
    },
    rules: {
      "vue/multi-word-component-names": 0,
    },
  },
  prettier,
];
