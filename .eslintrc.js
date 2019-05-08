module.exports = {
  "env": {
    "node": true,
  },
  "plugins": [
    "redux-saga"
  ],
  "extends": [
    "bmcallis",
    "plugin:react/recommended",
    "plugin:redux-saga/recommended",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaVersion": 7,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true
      }
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "no-invalid-this": 0,
    "babel/no-invalid-this": 1,
    "react/prefer-stateless-function": 0,
    "no-console": 0,
    "react/jsx-boolean-value": 0,
    "react/jsx-closing-bracket-location": 0,
    "max-len": ['error', 200, 2],
  }
};
