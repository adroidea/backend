module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/no-unused-vars': 2,
        'import/prefer-default-export': 0,
        'import/no-cycle': 0,
        'class-methods-use-this': 0,
        'max-len': [
            'error',
            {
                code: 150,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true
            }
        ],
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForInStatement',
                message:
                    'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
            },
            {
                selector: 'LabeledStatement',
                message:
                    'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
            },
            {
                selector: 'WithStatement',
                message:
                    '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
            }
        ],
        eqeqeq: ['error', 'always'],
        'no-constant-condition': 'off',
        'no-duplicate-imports': 'error',
        'no-undef': 0,
        'no-unreachable-loop': 'error',
        'sort-imports': 'error'
    }
};
