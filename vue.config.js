const WorkerPlugin = require('worker-plugin')

module.exports = {
  chainWebpack: (config) => {
    // Annoying!
    config.module.rules.delete("eslint");
  },
  configureWebpack: {
    plugins: [
      new WorkerPlugin()
    ]
  },
  devServer: {
    watchOptions: {
      poll: true,
    },
  },
};
