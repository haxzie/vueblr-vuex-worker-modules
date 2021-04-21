module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
  },
  devServer: {
    watchOptions: {
      poll: true,
    },
  },
};
