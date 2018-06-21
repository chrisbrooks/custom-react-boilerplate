const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const paths = require('./paths');

const postCssConfig = {
  ident: 'postcss',
  plugins: () => [
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9'
      ],
      flexbox: 'no-2009'
    })
  ]
};

const buildEntryPoint = entryPoint => [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  entryPoint
];

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: buildEntryPoint(paths.appIndexJs),
  output: {
    filename: '[name].js',
  },
  resolve: {
    modules: [paths.appSrc, paths.appNodeModules],
    extensions: ['.js', '.json']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: 'eslint'
            },
            loader: 'eslint-loader'
          }
        ],
        include: paths.appSrc
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: paths.appSrc,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', { modules: false }],
              'react',
              'stage-2'
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        include: paths.appSrc,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:7]'
            }
          },
          {
            loader: 'postcss-loader',
            options: postCssConfig
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml
    })
  ]
};
