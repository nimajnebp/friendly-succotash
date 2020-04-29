module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "extends": [
    "airbnb"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/no-named-as-default": 0,
    "react/state-in-constructor": 0,
    "max-len": [2, 160, 2],
    "no-underscore-dangle": 0,
    "object-curly-newline": 0,
    "react/jsx-props-no-spreading": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "newline-per-chained-call": 0
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["./src"]
      }
    }
  }
};
