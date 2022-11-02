export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Mapeo Icons',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    'nuxt-windicss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // https://i18n.nuxtjs.org
    '@nuxtjs/i18n',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],
  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome',
          'enter-search': 'Type a noun to search for icons',
          loading: 'loading',
          search: 'search',
          color: 'color',
          name: 'name',
          'enter-icon-name': 'Change icon name',
          error: "we couldn't find any icons with those terms",
          'save-images': 'Select the images below to download them',
          'search-again': 'Do another search',
          generate: 'Generate',
        },
        pt: {
          welcome: 'Bem vindo',
          'enter-search': 'Digite um substantivo para buscar ícones',
          loading: 'carregando',
          search: 'buscar',
          color: 'cor',
          name: 'nome',
          'enter-icon-name': 'Mudar o nome do ícone',
          'save-images': 'Selecione as imagens a baixo para salva-las',
          error: 'não encontramos nenhum ícone com esses termos',
          'search-again': 'Fazer outra busca',
          generate: 'Gerar',
        },
        es: {
          welcome: 'Bienvenido',
          'enter-search': 'Introduce un sustantivo para buscar iconos',
          loading: 'cargando',
          search: 'buscar',
          color: 'color',
          name: 'nombre',
          'enter-icon-name': 'Cambiar el nombre del icono',
          error: 'no pudimos encontrar ningún ícono con esos términos',
          'save-images': 'Seleccione las imágenes a bajo para guardarlas',
          'search-again': 'Hacer otra busca',
          generate: 'Generar',
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    // PRODUCTION
    // baseURL: 'http://example.com',
    // browserBaseURL: 'http://localhost:3000',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Server middleware: https://blowstack.com/blog/how-to-integrate-express_js-with-nuxt-app
  serverMiddleware: {
    '/api': '~/api',
  },
}
