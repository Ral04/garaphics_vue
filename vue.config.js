module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_variables.scss";`
      }
    }
  },

  publicPath: process.env.NODE_ENV === 'production' ? '/garaphics_vue/': '/'
  
};