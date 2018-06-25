const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const paths = require('./paths');
const getClientEnvironment = require('./env');

const publicUrl = '';
const env = getClientEnvironment(publicUrl);

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
    publicPath: '/'
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
        test: /\.(js|jsx)$/,
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
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'media/[name].[hash:8].[ext]'
        }
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
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'graphql-tag/loader'
        }]
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
            loader: 'sass-loader',
            options: {
              includePaths: [paths.globalSass]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml
    })
  ],
  performance: {
    hints: false
  }
};
