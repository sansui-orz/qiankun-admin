const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");

module.exports = merge(
  commonConfig({
    REACT_SUB_PRODUCT_HOST: `'//127.0.0.1:8011'`,
    VUE_SUB_PRODUCT_HOST: `'//127.0.0.1:8012'`,
    API_HOST: `'http://localhost:7999'`,
    MAIN_HOST: `'http://127.0.0.1:8010'`,
  }, true),
  {
    mode: "production",
    target: ["web", "es5"],
    cache: {
      type: "filesystem",
      allowCollectingMemory: true,
      buildDependencies: {
        // This makes all dependencies of this file - build dependencies
        config: [__filename],
      },
    },
    output: {
      filename: "asset/js/[name]_[contenthash].js",
      publicPath: "http://localhost:8010/",
    },
    externals: {
      React: "react",
      ReactDom: "react-dom",
      ReactRouterDom: "react-router-dom",
    },
    plugins: [
      // 由于使用http-server启动服务，所以多创建一个login页面对应路由。真实部署到服务器应该通过修改nginx配置支持history路由模式
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "../src/index.html"),
        filename: "login.html",
        inject: "body",
        favicon: path.resolve(__dirname, "../src/assets/images/logo.ico"),
        publicPath: "./",
        excludeChunks: ["main_for_react", "main_for_vue"],
      }),
    ],
  }
);
