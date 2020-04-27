const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jsx|js|tsx|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        options: { esModules: true },
        enforce: 'post',
        include: path.resolve(__dirname, '../src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/,
          /(ngfactory|ngstyle)\.js/
        ]
      }
    ]
  }
};
