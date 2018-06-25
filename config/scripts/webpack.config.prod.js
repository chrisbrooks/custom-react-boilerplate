const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const paths = require('./paths');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const getClientEnvironment = require('./env');

const publicUrl = '/';
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

module.exports = {
  mode: 'production',
  devtool: false,
  entry: paths.appIndexJs,
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: paths.appBuild,
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
      name: 'manifest',
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false
          }
        }
      })
    ]
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
        include: paths.appSrc,
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              sourceMap: false,
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
    new BundleAnalyzerPlugin({
      logLevel: 'error',
      analyzerMode: 'static',
      reportFilename: 'report.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'stats.json'
    }),
    new MiniCssExtractPlugin({
      chunkFilename: "css/styles.[hash:8].css"
    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyURLs: true
      }
    }),
    new ManifestPlugin({
      fileName: 'manifest.json'
    })
  ],
  performance: {
    hints: false
  }
};
