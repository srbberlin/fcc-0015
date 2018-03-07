module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "globals": {
        "angular": true,
        "React": true,
        "ReactDom": true,
        "d3": true,
        "console.log": true,
        "__dirname": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
