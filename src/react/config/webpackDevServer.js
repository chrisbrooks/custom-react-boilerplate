const openBrowser = require('react-dev-utils/openBrowser');
const {
  createCompiler,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');
const appName = require('../../../package.json').name;

const port = 3000;
const isInteractive = process.stdout.isTTY;
const clearConsole = () => process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const target = `http://localhost:${port}/`;
const useYarn = '../../../yarn.lock';
const HOST = process.env.HOST || '0.0.0.0';
const urls = prepareUrls(protocol, HOST, port);
const compiler = createCompiler(webpack, config, appName, urls, useYarn);
const options = {
  hot: true,
  compress: true,
  publicPath: config.output.publicPath,
  quiet: true,
  overlay: {
    errors: true
  }
};
const server = new WebpackDevServer(compiler, options);

server.listen(port, 'localhost', (err) => {
  if (err) {
    return console.log(err);
  }
  if (isInteractive) {
    clearConsole();
  }
  console.log('Starting the development server...');
  openBrowser(target);
  return false;
});
