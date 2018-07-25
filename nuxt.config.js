const pkg = require('./package')
require('dotenv').config()
const bodyParser = require('body-parser')
const session = require('express-session')
const dashboard = require('./config/dashboard')

module.exports = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    'assets/scss/index.scss',
    'bootstrap-vue/dist/bootstrap-vue.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    'plugins/bootstrap-vue.js',
    'plugins/vee-validate.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/toast',
    '@nuxtjs/font-awesome'
  ],

  toast: {
    position: 'bottom'
  },

  /*
  ** Add server middleware
  */
  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),
    '~/api/index.js'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    credentials: false,
    baseURL: process.env.GEMCORE_API || '127.0.0.1:3000',
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    routes: function () {
      return dashboard
        .then((res) => {
          return res.data.map((page) => {
            return {
              route: '/dashboard/' + page.slug,
              payload: page
            }
          })
        })
    }
  },
  env: {
    dashboard: dashboard
  }
}
