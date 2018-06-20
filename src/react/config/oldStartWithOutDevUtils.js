const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');
const open = require('open');

const port = 3000;
const isInteractive = process.stdout.isTTY;
const clearConsole = () => process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
const target = `http://localhost:${port}/`;
const compiler = webpack(config);
const options = {
  hot: true,
  compress: true,
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    assets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    entrypoints: false,
    hash: false,
    warnings: true,
    errors: true,
    modules: false,
    timings: false,
    version: false,
    publicPath: false
  },
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
  open(target);
  return false;
});
