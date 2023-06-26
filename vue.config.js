module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.ppdb.smkn4-kabtangerang.sch.id/",
        changeOrigin: true,
      },
    },
  },
};
