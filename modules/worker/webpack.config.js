//@ts-nocheck

const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    worker: './src/index.ts',
  },
  target: 'webworker',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: `worker.js`,
    path: path.resolve(__dirname, 'dist'),
  },
}
