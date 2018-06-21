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
  devtool: 'source-map',
  entry: paths.appIndexJs,
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: paths.appBuild
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
        sourceMap: true
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
        include: paths.appSrc,
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              sourceMap: true,
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
    new BundleAnalyzerPlugin({
      logLevel: 'error',
      analyzerMode: 'static',
      reportFilename: 'report.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'stats.json'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles.[hash:8].css'
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
  ]
};
