const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin, DefinePlugin } = require("webpack").container;

module.exports = {
  mode: "production",
  target: ["web", "es5"],
  entry: path.resolve(__dirname, "../src/index.tsx"),
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename],
    }
  },
  output: {
    filename: "asset/js/[name]_[contenthash].js",
    clean: true,
    publicPath: "http://localhost:8010/",
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
            plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-transform-async-to-generator"],
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
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  experiments: {
    outputModule: true,
  },
  externals: {
    React: "react",
    ReactDom: "react-dom",
    ReactRouterDom: "react-router-dom"
  },
  plugins: [
    new webpack.DefinePlugin({
      REACT_SUB_PRODUCT_HOST: `'//127.0.0.1:8011'`,
      VUE_SUB_PRODUCT_HOST: `'//127.0.0.1:8012'`,
      API_HOST: `'http://localhost:7999'`,
      MAIN_HOST: `'http://127.0.0.1:8010'`
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      inject: "body",
      favicon: path.resolve(__dirname, "../src/assets/images/logo.ico"),
      publicPath: "./",
      excludeChunks: ['main_request_react', 'main_request_vue']
    }),
    // 由于使用http-server启动服务，所以多创建一个login页面对应路由。真实部署到服务器应该通过修改nginx配置支持history路由模式
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      filename: 'login.html',
      inject: "body",
      favicon: path.resolve(__dirname, "../src/assets/images/logo.ico"),
      publicPath: "./",
      excludeChunks: ['main_request_react', 'main_request_vue']
    }),
    new ModuleFederationPlugin({
      name: "main_request_react",
      library: { type: "module" },
      filename: "remoteEntryForReact.js",
      exposes: {
        "./request": path.resolve(__dirname, "../src/utils/request.ts"),
      },
    }),
    new ModuleFederationPlugin({
      name: "main_request_vue",
      library: { type: "module" },
      filename: "remoteEntryForVue.js",
      exposes: {
        "./request": path.resolve(__dirname, "../src/utils/request.ts"),
      },
    }),
  ],
  stats: {
    errorDetails: false,
  },
};
