module.exports = {
    root: true,
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    rules:{
        'react/jsx-props-no-spreading':'off',
    },
    extends: [
        '@react-native-community',
        'airbnb-typescript',
        'prettier',
    ]
};
