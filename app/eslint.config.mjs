// @ts-check
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs', 'dist/', 'node_modules/'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    eslintConfigPrettier, // ✅ Отключает конфликты ESLint и Prettier
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            ecmaVersion: 2022, // ✅ Используем современный ECMAScript
            sourceType: 'module',
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        plugins: {
            import: eslintPluginImport, // ✅ Плагины теперь указываются как объект
        },
        rules: {
            // ✅ Предпочитаем type-импорты
            'import/order': [
                'error',
                {
                    'alphabetize': { order: 'asc' },
                    'newlines-between': 'always',
                    'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                },
            ],
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

            // ⚠️ Улучшенная безопасность и строгая проверка типов
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unsafe-return': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-call': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'warn',

            // ⚠️ Рекомендуемые, но не блокирующие правила
            '@typescript-eslint/require-await': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

            // 🔄 Выключенные правила для удобства
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
        },
    },
);