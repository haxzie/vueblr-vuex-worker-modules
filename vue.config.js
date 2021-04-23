const WorkerPlugin = require("worker-plugin")

module.exports = {
  chainWebpack: (config) => {
    // Buhahahahahaa
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
