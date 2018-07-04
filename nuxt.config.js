module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'MusicNuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My proyect nuxt.js' }
    ],
    link: [
      {rel:"stylesheet", href:"https://fonts.googleapis.com/icon?family=Material+Icons"}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  plugins: [{src:'~plugins/vuetify.js'} , {src:'~/plugins/vue-notifications',ssr:false}],
  css: ['~assets/app.styl'],
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios','vuetify','vue-notifications'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      /*if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }*/
    }
  }
}
