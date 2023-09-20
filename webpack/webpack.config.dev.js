const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    filename: "asset/js/[name].js",
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
            // 做资源重定向
            const pathname = context.parsedUrl.pathname
            if (pathname.includes(".") && pathname.includes('/')) {
              const paths = pathname.split("/");
              console.log('pathname', pathname)
              if (!paths[0]) paths.shift()
              if (paths[0] !== 'asset') {
                const p = paths.reduce((pre, nxt) => {
                  if ((!pre && nxt.includes('.')) || (!pre && nxt === 'asset')) {
                    return '/' + nxt
                  } else if (pre) {
                    return pre + '/' + nxt
                  } else {
                    return ''
                  }
                }, '')
                console.log('p => ', p)
                return p || '/'
              }
              return "/" + paths.join('/');
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
              outputPath: "./asset/images",
              name: '[name].[ext][query]',
              publicPath: './dist/asset/images'
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
      REACT_SUB_PRODUCT_HOST: `'http://localhost:8001'`,
      VUE_SUB_PRODUCT_HOST: `'http://localhost:8002'`,
      API_HOST: `'http://localhost:7999'`,
      MAIN_HOST: `'http://localhost:8000'`
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      inject: "body",
      favicon: path.resolve(__dirname, '../src/assets/images/logo.ico'),
      publicPath: './',
      excludeChunks: ['main_request_react', 'main_request_vue']
    }),
    new ModuleFederationPlugin({
      name: "main_request_react",
      library: { type: "module" },
      filename: "remoteEntryForReact.js",
      exposes: {
        "./request": "./src/utils/request.ts",
      },
    }),
    new ModuleFederationPlugin({
      name: "main_request_vue",
      library: { type: "module" },
      filename: "remoteEntryForVue.js",
      exposes: {
        "./request": "./src/utils/request.ts",
      },
    }),
  ],
  stats: {
    errorDetails: false,
  },
};
