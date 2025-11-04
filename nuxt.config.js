// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  // Global page headers
  app: {
    head: {
      title: "CoMapeo Icons Generator",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // Global CSS
  css: ["~/assets/main.css"],

  // Modules
  modules: ["@nuxtjs/i18n", "@nuxtjs/tailwindcss"],

  runtimeConfig: {
    nounProjectKey: process.env.NOUN_KEY,
    nounProjectSecret: process.env.NOUN_SECRET,
    iconsPerPage: process.env.ICONS_TO_DOWNLOAD,
  },

  nitro: {
    externals: {
      external: ["svgo", "css-tree", "potrace"],
    },
  },

  // i18n configuration
  i18n: {
    langDir: "locales/",
    lazy: true,
    defaultLocale: "en",
    strategy: "prefix_except_default",
    vueI18n: "./i18n.config.ts",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "pt", name: "Português", file: "pt.json" },
      { code: "es", name: "Español", file: "es.json" },
      { code: "th", name: "ไทย", file: "th.json" },
      { code: "nl", name: "Nederlands", file: "nl.json" },
      { code: "fr", name: "Français", file: "fr.json" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    restructureDir: ".",
  },

  devtools: { enabled: true },
});
