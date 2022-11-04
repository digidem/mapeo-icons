export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Mapeo Icons Generator',
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
          title: 'Mapeo Icons Generator',
          description:
            'This tool can be used to generate icons for use in Mapeo, or any other tool. Currently, the tool generates icons in an SVG format ready to be used in a Mapeo configuration.',
          config:
            'To learn more about integrating these icons in a Mapeo configuration, see the documentation here:',
          link: 'link',
          'select-language': 'Select your language',
          'enter-search': 'Enter one or more words to search for icons',
          loading: 'loading',
          search: 'search',
          color: 'color',
          name: 'name',
          'enter-icon-name': 'Change icon name',
          error: "we couldn't find any icons associated with that phrase",
          loadingMoreError:
            "that's all the icons we could find for that phrase",
          'save-images':
            "Click the below icons to download them. If download doesn't happen automatically, right-click or touch and hold to save the SVGs.",
          'search-again': 'Do another search',
          'load-more': 'Load more',
          generate: 'Generate',
          'select-icon': 'Select an icon to generate',
        },
        pt: {
          title: 'Gerador de ícones Mapeo',
          description:
            'Esta ferramenta pode ser usada para gerar ícones para uso no Mapeo, ou qualquer outra ferramenta. Atualmente, a ferramenta gera ícones em formato SVG prontos para serem usados em uma configuração Mapeo.',
          config:
            'Para saber mais sobre como integrar estes ícones em uma configuração Mapeo, veja a documentação aqui:',
          link: 'link',
          'select-language': 'Selecione seu idioma',
          'enter-search': 'Digite um ou mais substantivos para buscar ícones',
          loading: 'carregando',
          search: 'buscar',
          color: 'cor',
          name: 'nome',
          'enter-icon-name': 'Mudar o nome do ícone',
          'save-images': 'Clique nos ícones a baixo para salva-los',
          error: 'não encontramos nenhum ícone com essa frase',
          loadingMoreError:
            'esses são todos os ícones que encontramos para essa frase',
          'search-again': 'Fazer outra busca',
          'load-more': 'Carregar mais',
          generate: 'Gerar',
          'select-icon': 'Selecione um ícone para gerar',
        },
        es: {
          title: 'Generador de iconos Mapeo',
          description:
            'Esta herramienta se puede utilizar para generar iconos para su uso en Mapeo o cualquier otra herramienta. Actualmente, la herramienta genera iconos en formato SVG listos para ser utilizados en una configuración de Mapeo.',
          config:
            'Para obtener más información sobre cómo integrar estos íconos en una configuración de Mapeo, consulte la documentación aquí:',
          link: 'enlace',
          'select-language': 'Seleccione su idioma',
          'enter-search': 'Introduce uno o más sustantivos para buscar iconos',
          loading: 'cargando',
          search: 'buscar',
          color: 'color',
          name: 'nombre',
          'enter-icon-name': 'Cambiar el nombre del icono',
          error: 'no pudimos encontrar ningún ícono con esa frase',
          loadingMoreError:
            'estos son todos los íconos que pudimos encontrar para esa frase',
          'save-images':
            'Haga clic en las siguientes imágenes para guardarlas.',
          'search-again': 'Hacer otra búsqueda',
          'load-more': 'Cargar más',
          generate: 'Generar',
          'select-icon': 'Seleccione un icono para generar',
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
