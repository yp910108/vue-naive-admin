import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import configPrettier from '@vue/eslint-config-prettier'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginVue from 'eslint-plugin-vue'
import pluginImport from 'eslint-plugin-import'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    plugins: { import: pluginImport }
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],

  vueTsConfigs.recommended,

  configPrettier,

  skipFormatting,

  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          $schema: 'https://json.schemastore.org/prettierrc',
          semi: false,
          tabWidth: 2,
          singleQuote: true,
          printWidth: 100,
          trailingComma: 'none'
        }
      ],
      'import/no-duplicates': [
        'error',
        {
          'prefer-inline': true
        }
      ],
      'import/order': [
        'error',
        {
          'newlines-between': 'never',
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: 'vue',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'pinia',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'vue-i18n',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'vue-router',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'naive-ui',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'lodash-es',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@vueuse/**',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'vueuc',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@/settings',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/locales',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/constants',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/utils',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/hooks',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/store',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/router',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/service',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/layouts',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/components',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/views',
              group: 'internal',
              position: 'before'
            }
          ]
        }
      ],
      'vue/multi-word-component-names': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_|^e$'
        }
      ]
    }
  }
)
