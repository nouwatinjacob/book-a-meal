
module.exports = { 
  "extends": ["airbnb-base","plugin:react/recommended"],
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  rules:{
    "linebreak-style": 0,
    "max-len": [2, 100, 2],
    "comma-dangle": 0,
    "consistent-return": 0,
    "no-console": 0,
    "no-param-reassign": 0,
    "camelcase":0,
    "no-return-assign": 1,
    "class-methods-use-this": 0,
    "import/no-named-as-default": 0,
    "no-nested-ternary": 0,
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    "no-undef": 0,
    "prefer-destructuring": 0,
    "no-script-url": 0,
    "no-unused-vars": 0,
    "global-require": 1,
    "curly": ["error", "multi-line"],
    "object-curly-newline": 0,
    "import/no-unresolved": [2, {
      "commonjs": true
    }],
    "no-shadow": ["error", {
      "allow": ["req", "res", "err"]
    }],
    "valid-jsdoc": ["error", {
      "requireReturn": true,
      "requireReturnType": true,
      "requireParamDescription": false,
      "requireReturnDescription": true
    }],
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true
      }
    }],
    "quotes": 0,
    "no-console": 1,
    "no-debugger": 1,
    "no-var": 1,
    "semi": [1, "always"],
    "no-trailing-spaces": 0,
    "eol-last": 0,
    "no-underscore-dangle": 0,
    "no-alert": 0,
    "no-lone-blocks": 0,
    "jsx-quotes": 0,
    "react/display-name": [ 1, {"ignoreTranspilerName": false }],
    "react/forbid-prop-types": [1, {"forbid": ["any"]}],
    "react/jsx-boolean-value": 0,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-curly-spacing": 1,
    "react/jsx-indent-props": 0,
    "react/jsx-key": 1,
    "react/jsx-max-props-per-line": 0,
    "react/jsx-no-bind": 1,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-literals": 0,
    "react/jsx-no-undef": 1,
    "react/jsx-pascal-case": 1,
    "react/jsx-sort-prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/no-danger": 1,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-multi-comp": 1,
    "react/no-set-state": 0,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 1,
    "react/require-extension": 0,
    "react/self-closing-comp": 0,
    "react/sort-comp": 1,
    "react/wrap-multilines": 0
  }
};