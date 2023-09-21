const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(commonConfig({
  REACT_SUB_PRODUCT_HOST: `'http://localhost:8001'`,
  VUE_SUB_PRODUCT_HOST: `'http://localhost:8002'`,
  API_HOST: `'http://localhost:7999'`,
  MAIN_HOST: `'http://localhost:8000'`
}), {
  mode: "development",
  output: {
    filename: "asset/js/[name].js",
    publicPath: "http://localhost:8000/",
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    liveReload: true,
    compress: false, // 开发环境不压缩，提升速度
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET, PUT, POST, DELETE",
    },
    devMiddleware: {writeToDisk : true},
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
  plugins: [new ReactRefreshWebpackPlugin()],
});
