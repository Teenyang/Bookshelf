module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "@/assets/scss/styles/_color.scss";
        `,
      },
    },
  },
};
