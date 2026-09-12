import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    /* ========================================
     * IGNORE
     * ======================================== */

    {
        ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**", "logs/**", "*.min.js"],
    },

    /* ========================================
     * JAVASCRIPT
     * ======================================== */

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
            reportUnusedInlineConfigs: "error",
            reportUnusedDisableDirectives: "error",
        },

        rules: {
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

            "no-shadow": "warn",

            "prefer-const": "error",

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

            "no-with": "error",

            "no-delete-var": "error",

            /* ========================================
             * PROMISE / ASYNC
             * ======================================== */

            "no-async-promise-executor": "error",

            "no-promise-executor-return": "error",

            /* ========================================
             * OBJETOS / ARRAYS
             * ======================================== */

            "no-prototype-builtins": "error",

            "no-self-compare": "error",

            "no-self-assign": "error",

            "no-duplicate-imports": "error",

            /* ========================================
             * IMPORTS
             * ======================================== */

            // A organização dos imports pode ser feita
            // utilizando comentários e agrupamentos.
            "sort-imports": "off",

            /* ========================================
             * DEBUG
             * ======================================== */

            "no-debugger": "error",

            "no-alert": "error",

            /* ========================================
             * CONSOLE
             * ======================================== */

            // Mantido como warning durante o desenvolvimento.
            // Em produção, prefira utilizar o Winston.
            "no-console": "warn",

            /* ========================================
             * COMENTÁRIOS
             * ======================================== */

            // Comentários podem ter ou não espaço após //.
            "spaced-comment": "off",

            /* ========================================
             * VÍRGULAS
             * ======================================== */

            // O projeto utiliza vírgulas finais.
            "comma-dangle": "off",

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

            indent: [
                "error",
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

            "operator-linebreak": ["error", "before"],

            "no-mixed-operators": "warn",

            /* ========================================
             * RETURN
             * ======================================== */

            "consistent-return": "warn",

            "no-useless-return": "error",

            "no-else-return": "warn",

            /* ========================================
             * QUALIDADE
             * ======================================== */

            "no-ex-assign": "error",

            "no-extend-native": "error",

            "no-extra-bind": "error",

            "no-extra-boolean-cast": "error",

            "no-fallthrough": "error",

            "no-floating-decimal": "error",

            "no-func-assign": "error",

            "no-import-assign": "error",

            "no-loss-of-precision": "error",

            "no-obj-calls": "error",

            "no-octal": "error",

            "no-regex-spaces": "error",

            "no-sparse-arrays": "error",

            "no-unmodified-loop-condition": "error",

            "use-isnan": "error",

            "valid-typeof": "error",
        },
    },

    /* ========================================
     * ARQUIVOS DE CONFIGURAÇÃO
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
