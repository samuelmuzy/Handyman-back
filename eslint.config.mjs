import globals from 'globals';

import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
    {
        ignores: ['node_modules/', 'dist/', 'build/']
    },
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            parser: tsparser,
            globals: globals.browser
        },
        plugins: {
            '@typescript-eslint': tseslint
        },
        rules: {
            'constructor-super': 'error',
            'no-console': 'warn',
            'semi': ['error', 'always'],
            'curly': ['error', 'all'],
            'quotes': ['warn', 'single'],
            'indent': ['error', 4],
            'no-var': ['error'],
            'prefer-const': ['warn'],
            'arrow-parens': ['error', 'always'],
            'object-curly-spacing': ['warn', 'always'],
            'no-debugger': ['error'],
            '@typescript-eslint/no-unused-vars': ['warn'],
            '@typescript-eslint/no-explicit-any': 'warn',
            'eqeqeq': ['error', 'always']
        }
    }
];
