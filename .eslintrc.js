module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: [
    '@typescript-eslint', // Import rule defintions for typescript
    'react-hooks' // Import rule defintions for react hooks
  ],
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended' // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs

    'arrow-parens': ['error', 'always'], // Disallow arrow functions without parenthesis
    curly: ['error' ], // Enforce curly braces on all block statements
    'brace-style': ['error', '1tbs', { allowSingleLine: true }], // Enforce same-line curly brace opening and closing
    'block-spacing': ['error', 'always'], // Enforce spacing between curly braces
    'camelcase': 'off', // Disable camel-case enforcement
    'comma-dangle': ['error', 'never'], // Disallow extra trailing commas
    'constructor-super': 'error', // Require super() in child class constructors
    'indent': 'off', // Disable indentations rules (to be overridden by Typescript. https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md)
    'guard-for-in': 'error', // Require hasOwnProperty() check in for...in loops
    'new-parens': 'error', // Require paranthesis for all "new" instantations
    'newline-before-return': 'error', // Enforce newlines before return statements
    'newline-per-chained-call': 'off', // Permit chained calls without newlines
    'no-array-constructor': 'error', // Force Array constructors to only support being instantiated with a length
    'no-eval': 'error', // Disallow eval()
    'no-new-func': 'error', // Disallow "new Function()"
    'no-shadow': ['error', { builtinGlobals: true }], // Prevent storing local variables with the same name as another variable in scope
    'no-this-before-super': 'error', // Prevent usage of "this" before super()
    'no-caller': 'error', // Disallow use of arguments.caller/callee
    'no-var': 'off', // Permit 'var'
    'one-var-declaration-per-line': ['error', 'initializations'], // Prevent mix/match of variable declarations w/ and w/o assignments ont he same line 
    quotes: ['error', 'single', { allowTemplateLiterals: true }], // Enforce use of single quotes and backticks only
    'prefer-const': 'off', // Don't enforce const on vars that are only assigned once
    'prefer-spread': 'off', // Don't enforce spread operator for apply() calls
    semi: ['error', 'always'], // Enforce semicolons
    'space-before-blocks': 'error', // Enforce space before opening curly brace
    'spaced-comment': ['error', 'always'], // Enforce space between start and end of comments and comment blocks
    'no-unused-vars': 'off', // Allow unused vars (TODO: May want to remove after project is more mature)

    // React-specific rules
    'react/no-find-dom-node': 'off', // Allow findDOMNode() usage
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies

    // Typescript-specific rules
    '@typescript-eslint/adjacent-overload-signatures': ['error'], // Force overloaded methods to be adjacent to each other
    '@typescript-eslint/array-type': 'error', // Require Array<T> or T[] to be used
    '@typescript-eslint/explicit-function-return-type': 'off', // Allow functions to be defined without explit return type
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Don't check for return types on module exports
    '@typescript-eslint/explicit-member-accessibility': ['error', { // Make all accessibility keywords mandatory (except for constructor)
      accessibility: 'explicit',
      overrides: {
        accessors: 'explicit',
        constructors: 'off',
        methods: 'explicit',
        properties: 'explicit',
        parameterProperties: 'explicit'
      }
    }],
    '@typescript-eslint/indent': ['error', 2], // Force indentation of two spaces
    '@typescript-eslint/member-ordering': ['error', { 'default': ['field', 'constructor', 'method'] } ], // Require fields, constructor, and methods to be defined in that order in a class)
    '@typescript-eslint/naming-convention': ['error',
      { selector: 'class', 'format': ['PascalCase'] }, // Require PascalCase on class names
      { selector: 'interface', 'format': ['PascalCase'], 'custom': { 'regex': '^I[A-Z]', 'match': true } } // Require 'I' prefix on interfaces
    ],
    '@typescript-eslint/no-empty-function': 'off', // Allow empty functions
    '@typescript-eslint/no-explicit-any': 'off', // Permit :"any"
    '@typescript-eslint/no-namespace': 'error', // Disallow namespaces (outdated TS feature)
    '@typescript-eslint/no-unused-vars': 'off',  // Allow unused vars (TODO: May want to remove after project is more mature)
    '@typescript-eslint/no-var-requires': 'off', // Permit require() usage
    '@typescript-eslint/type-annotation-spacing': 'off', // Permit any type annotation spacing
    '@typescript-eslint/no-empty-interface': 'off', // Permit empty interfaces
    '@typescript-eslint/no-inferrable-types': 'off' // Permit inferred types
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
};
