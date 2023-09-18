const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
// const dependencies = require(path.join(__dirname, './package.json')).dependencies;

module.exports = {
  mode: process.env.mode || "development",
  entry: "./src/index.tsx",
  output: {
    filename: "index.js",
    clean: true,
    publicPath: "http://localhost:8000/",
    scriptType: "text/javascript",
  },
  devServer: {
    hot: true,
    liveReload: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET, PUT, POST, DELETE",
    },
    port: 8000,
    allowedHosts: "auto",
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/[a-z_-]+\/.*/,
          to: (context) => {
            if (context.parsedUrl.pathname.includes(".")) {
              const paths = context.parsedUrl.pathname.split("/");
              return "/" + paths[paths.length - 1];
            }
            return "/";
          },
        },
      ],
    },
    client: {
      overlay: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          }
        ],
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
            plugins: ["@babel/plugin-transform-runtime"],
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
      "@": path.resolve(__dirname, "./src"),
    },
  },
  experiments: {
    outputModule: true,
  },
  externals: {
    React: "react",
    ReactDom: "react-dom",
    ReactRouterDom: "react-router-dom",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      inject: "body",
    }),
    new ModuleFederationPlugin({
      name: "main_request_react",
      library: { type: "module" },
      filename: "remoteEntryForReact.js",
      exposes: {
        "./request": "./src/utils/request.ts",
      },
      shared: ["axios"],
    }),
    new ModuleFederationPlugin({
      name: "main_request_vue",
      library: { type: "module" },
      filename: "remoteEntryForVue.js",
      exposes: {
        "./request": "./src/utils/request.ts",
      },
      shared: ["axios"],
    }),
  ],
  stats: {
    errorDetails: false,
  },
};
