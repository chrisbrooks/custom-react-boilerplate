const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const paths = require('./paths');

const basePath = path.resolve(__dirname, paths.appSrc);

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
  entry: {
    'react-shipping-calculator': buildEntryPoint(path.resolve(__dirname, `${basePath}/containers/ShippingCalculator/index.js`)),
    'react-postcode-lookup': buildEntryPoint(path.resolve(__dirname, `${basePath}/containers/PostcodeLookup/index.js`))
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    modules: [basePath, 'node_modules'],
    extensions: ['.js', '.json']
  },
  optimization: {
    // this is only needed if we are using multiple
    // entry points which are on the same page
    runtimeChunk: {
      name: 'react-runtime-chunk'
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'react-commons-bundle',
          chunks: 'initial',
          minChunks: 2
        }
      }
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
              eslintPath: require.resolve('eslint')
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: path.resolve(__dirname, basePath),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, basePath),
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
        include: path.resolve(__dirname, basePath),
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
