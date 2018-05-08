
module.exports = { 
  "extends": ["airbnb-base"],
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
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
    "no-unused-vars": 1,
    "global-require": 1,
    "curly": ["error", "multi-line"],
    "object-curly-newline": 0,
    "import/no-unresolved": [2, {
      "commonjs": true
    }],
    "no-shadow": ["error", {
      "allow": ["req", "res", "err"]
    }]
  }
};