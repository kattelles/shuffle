module.exports = {
  context: __dirname,
  entry: "./js/main.js",
  output: {
    path: "./app/assets/javascripts",
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
