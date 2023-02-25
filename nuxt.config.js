module.exports= {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'stylesheet', type: 'css', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', crossorigin: '' }
    ]


  },
  
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  
    "~/plugins/filter",   
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    'vue-sweetalert2/nuxt',
  ],
  // Moment JS for date formats
  moment: {
    defaultTimezone: 'America/Los_Angeles'
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || 'http://localhost:7016'
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:7016'
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/fontawesome',
    'vue-sweetalert2/nuxt',
  ],
  sweetalert: {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    port: 4485 // default: 3000
  }
  
}
