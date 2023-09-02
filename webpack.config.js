const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: 'index.js',
    clean: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html')
    })
  ]
};
