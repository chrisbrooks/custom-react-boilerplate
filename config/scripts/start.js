const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const paths = require('./paths');
const {
  choosePort,
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const config = require('./webpack.config.dev');
// eslint-disable-next-line
const appName = require(paths.appPackageJson).name;

const useYarn = paths.yarnLockFile;
const isInteractive = process.stdout.isTTY;
const protocol = 'http';
const defaultPort = 3000;
const host = '0.0.0.0';
const devServerOptions = {
  contentBase: paths.appPublic,
  hot: true,
  compress: true,
  quiet: true,
  overlay: {
    errors: true
  }
};

choosePort(host, defaultPort)
  .then((port) => {
    if (port == null) {
      return;
    }
    const urls = prepareUrls(protocol, host, port);
    const compiler = createCompiler(webpack, config, appName, urls, useYarn);
    const devServer = new WebpackDevServer(compiler, devServerOptions);
    devServer.listen(port, host, (err) => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log('Starting the development server...');
      openBrowser(urls.localUrlForBrowser);
      return false;
    });

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
