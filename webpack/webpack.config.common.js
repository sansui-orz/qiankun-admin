const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin, DefinePlugin } = require("webpack").container;

module.exports = (config, isProduction) => ({
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    clean: true,
    scriptType: "text/javascript",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              outputPath: "./asset/images",
              name: "[name]_[hash].[ext][query]",
              publicPath: "./asset/images",
            },
          },
        ],
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              "@babel/preset-typescript",
              [
                "@babel/preset-env",
                {
                  targets: "> 0.25%, not dead",
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
            ],
            plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-transform-async-to-generator", ...(isProduction ? [] : [require.resolve('react-refresh/babel')])],
          },
        },
      },
      {
        test: /\.(less|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      REACT_SUB_PRODUCT_HOST: config.REACT_SUB_PRODUCT_HOST,
      VUE_SUB_PRODUCT_HOST: config.VUE_SUB_PRODUCT_HOST,
      API_HOST: config.API_HOST,
      MAIN_HOST: config.MAIN_HOST,
      $t: '__transition'
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      inject: "body",
      favicon: path.resolve(__dirname, "../src/assets/images/logo.ico"),
      publicPath: "./",
      excludeChunks: ['main_for_react', 'main_for_vue']
    }),
    new ModuleFederationPlugin({
      name: "main_for_react",
      library: { type: "module" },
      filename: "remoteEntryForReact.js",
      exposes: {
        "./request": path.resolve(__dirname, "../src/utils/request.ts"),
        "./i18n": path.resolve(__dirname, '../src/utils/i18n.ts')
      },
    }),
    new ModuleFederationPlugin({
      name: "main_for_vue",
      library: { type: "module" },
      filename: "remoteEntryForVue.js",
      exposes: {
        "./request": path.resolve(__dirname, "../src/utils/request.ts"),
        "./i18n": path.resolve(__dirname, '../src/utils/i18n.ts')
      },
    }),
  ],
  stats: {
    errorDetails: false,
  },
});
