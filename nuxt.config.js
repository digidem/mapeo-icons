// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  // Global page headers
  app: {
    head: {
      title: 'CoMapeo Icons Generator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // Global CSS
  css: ['~/assets/main.css'],

  // Auto import components
  components: true,

  // Modules
  modules: [
    // https://i18n.nuxtjs.org
    '@nuxtjs/i18n',
    // https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
  ],

  // i18n configuration
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'pt', name: 'Português', file: 'pt.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'th', name: 'ไทย', file: 'th.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    restructureDir: '.',
  },

  vite: {
    ssr: {
      external: ['vue-color'],
    },
  },

  devtools: { enabled: true },
})
