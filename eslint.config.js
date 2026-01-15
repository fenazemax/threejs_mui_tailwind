import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettier,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@stylistic': stylistic,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      '@stylistic/max-len': ['warn', { code: 140 }],
      ...reactHooks.configs.recommended.rules,
      'react-hooks/set-state-in-effect': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
]
