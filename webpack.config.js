const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
console.log('process.env.mode => ', process.env.mode)

module.exports = {
  mode: process.env.mode || 'development',
  entry: "./src/index.tsx",
  output: {
    filename: 'index.js',
    clean: true,
  },
  devServer: {
    hot: true,
    liveReload: true,
    port: 8000,
    // historyApiFallback: true,
    // static: {
    //   publicPath: '/'
    // }
    historyApiFallback: {
      rewrites: [
        { from: /^\/[a-z_-]+\/.*/, to: (context) => {
          if (context.parsedUrl.pathname.includes('.')) {
            const paths = context.parsedUrl.pathname.split('/')
            return '/' + paths[paths.length - 1]
          }
          return '/'
        } }
      ]
    }
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html')
    })
  ],
  stats: {
    errorDetails: true
  }
};
