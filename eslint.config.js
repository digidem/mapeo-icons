const vue = require('eslint-plugin-vue')
const prettier = require('eslint-config-prettier')

module.exports = [
  {
    files: ['**/*.vue', '**/*.js', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    },
    plugins: {
      vue: vue,
    },
    rules: {
      ...vue.configs['flat/essential'].rules,
      'vue/multi-word-component-names': 0,
    },
    ignores: ['node_modules/', '.nuxt/', '.output/', 'dist/', '*.config.js'],
  },
  prettier,
]
