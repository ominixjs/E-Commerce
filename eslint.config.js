import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**", "logs/**", "*.min.js"],
    },

    {
        files: ["**/*.js"],

        extends: [js.configs.recommended],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",

            globals: {
                ...globals.node,
            },
        },

        linterOptions: {
            reportUnusedInlineConfigs: "warn",
            reportUnusedDisableDirectives: "warn",
        },

        rules: {
            /* ========================================
             * ERROS REAIS
             * ======================================== */

            "no-undef": "error",
            "no-unreachable": "error",
            "no-dupe-keys": "error",
            "no-duplicate-case": "error",
            "no-invalid-regexp": "error",
            "no-irregular-whitespace": "error",
            "no-unreachable-loop": "error",
            "no-ex-assign": "error",
            "no-func-assign": "error",
            "no-import-assign": "error",
            "no-loss-of-precision": "error",
            "no-obj-calls": "error",
            "no-regex-spaces": "error",
            "no-sparse-arrays": "error",
            "no-unexpected-multiline": "error",
            "no-with": "error",
            "use-isnan": "error",
            "valid-typeof": "error",

            /* ========================================
             * VARIÁVEIS
             * ======================================== */

            "no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    args: "after-used",
                    ignoreRestSiblings: true,
                    caughtErrors: "none",
                },
            ],

            "no-const-assign": "error",
            "no-redeclare": "error",
            "no-shadow": "warn",
            "prefer-const": "warn",

            /* ========================================
             * BOAS PRÁTICAS
             * ======================================== */

            eqeqeq: ["error", "always"],
            curly: ["error", "all"],
            "no-var": "error",
            "no-new-wrappers": "error",
            "no-new-object": "error",
            "no-array-constructor": "error",
            "no-eval": "error",
            "no-implied-eval": "error",
            "no-new-func": "error",
            "no-delete-var": "error",
            "no-prototype-builtins": "warn",
            "no-self-compare": "error",
            "no-self-assign": "error",
            "no-duplicate-imports": "warn",

            /* ========================================
             * PROMISES / ASYNC
             * ======================================== */

            "no-async-promise-executor": "error",
            "no-promise-executor-return": "error",

            /* ========================================
             * IMPORTS
             * ======================================== */

            "sort-imports": [
                "warn",
                {
                    ignoreDeclarationSort: true,
                },
            ],

            /* ========================================
             * DEBUG
             * ======================================== */

            "no-debugger": "error",
            "no-alert": "error",

            /* ========================================
             * CONSOLE
             * ======================================== */

            "no-console": "warn",

            /* ========================================
             * RETORNOS
             * ======================================== */

            "consistent-return": "warn",
            "no-useless-return": "warn",
            "no-else-return": "warn",

            /* ========================================
             * ESTILO
             * ======================================== */

            semi: ["error", "always"],

            quotes: [
                "error",
                "double",
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true,
                },
            ],

            /*
             * Indentação é aviso porque o Prettier
             * pode ser responsável por formatá-la.
             */
            indent: [
                "warn",
                4,
                {
                    SwitchCase: 1,
                    VariableDeclarator: "first",
                    outerIIFEBody: 1,
                    MemberExpression: 1,

                    FunctionDeclaration: {
                        parameters: "first",
                        body: 1,
                    },

                    FunctionExpression: {
                        parameters: "first",
                        body: 1,
                    },

                    CallExpression: {
                        arguments: "first",
                    },

                    ArrayExpression: "first",
                    ObjectExpression: "first",
                },
            ],

            "comma-dangle": [
                "error",
                {
                    arrays: "always-multiline",
                    objects: "always-multiline",
                    imports: "always-multiline",
                    exports: "always-multiline",
                    functions: "never",
                },
            ],

            "object-curly-spacing": ["error", "always"],
            "array-bracket-spacing": ["error", "never"],
            "computed-property-spacing": ["error", "never"],

            "keyword-spacing": [
                "error",
                {
                    before: true,
                    after: true,
                },
            ],

            "space-before-blocks": ["error", "always"],

            "space-before-function-paren": [
                "error",
                {
                    named: "never",
                    anonymous: "always",
                    asyncArrow: "always",
                },
            ],

            "space-in-parens": ["error", "never"],

            /*
             * Comentários não devem impedir o desenvolvimento.
             */
            "spaced-comment": "warn",

            /* ========================================
             * LINHAS
             * ======================================== */

            "eol-last": ["error", "always"],

            "no-multiple-empty-lines": [
                "error",
                {
                    max: 1,
                    maxEOF: 0,
                    maxBOF: 0,
                },
            ],

            "no-trailing-spaces": "error",

            /* ========================================
             * OPERADORES
             * ======================================== */

            "operator-linebreak": ["warn", "before"],
            "no-mixed-operators": "warn",

            /* ========================================
             * QUALIDADE
             * ======================================== */

            "no-extra-bind": "warn",
            "no-extra-boolean-cast": "warn",
            "no-fallthrough": "error",
            "no-floating-decimal": "error",
            "no-octal": "error",
            "no-sparse-arrays": "error",
            "no-unmodified-loop-condition": "warn",
        },
    },

    /* ========================================
     * CONFIGURAÇÕES
     * ======================================== */

    {
        files: ["**/*.config.js", "eslint.config.js"],

        rules: {
            "no-console": "off",
        },
    },

    /* ========================================
     * TESTES
     * ======================================== */

    {
        files: ["**/*.test.js", "**/*.spec.js", "tests/**/*.js"],

        rules: {
            "no-console": "off",
            "no-unused-vars": "warn",
        },
    },
]);
