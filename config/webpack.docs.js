const path = require('path');
const glob = require('glob');
const zipObject = require('lodash/zipObject');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const aliases = require('./aliases');

module.exports = (env, argv) => ({
  mode: 'production',
  devtool: 'source-map',
  entry: {
    ...{
      docs: [
        '@babel/polyfill',
        'whatwg-fetch',
        path.resolve(process.cwd(), 'src/docs/index.js'),
      ],
    },
    ...zipObject(
      glob.sync('./src/components/*/example.js').map(f =>
        f.split(path.sep).slice(-2, -1)[0]
      ),
      glob.sync('./src/components/*/example.js').map(f => [
        '@babel/polyfill',
        'whatwg-fetch',
        f,
      ])
    ),
  },
  output: {
    filename: '[name]/script.js',
    path: path.resolve(process.cwd(), 'docs/'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: aliases,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                'targets': {
                  'browsers': 'last 2 versions',
                },
              }],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/proposal-class-properties',
            ],
          },
        },
      }, {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }, {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }, {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [
    ...glob.sync('./src/components/*/example.js').map(f => {
      const chunk = f.split(path.sep).slice(-2, -1)[0];
      return new HtmlWebpackPlugin({
        meta: { viewport: 'width=device-width, initial-scale=1' },
        template: path.resolve(process.cwd(), 'src/template/index.html'),
        filename: `${chunk}/index.html`,
        chunks: [chunk],
      });
    }),
    new HtmlWebpackPlugin({
      meta: { viewport: 'width=device-width, initial-scale=1' },
      template: path.resolve(process.cwd(), 'src/template/index.html'),
      filename: 'index.html',
      chunks: ['docs'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/styles.css',
    }),
  ],
});
