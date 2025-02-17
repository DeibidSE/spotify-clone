// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  eslint: { lintOnStart: false },
  experimental: {
    viewTransition: true
  },
  ssr: false,
  runtimeConfig: {
    public: {
      BASE_URL: '/spotify-clone'
    }
  },
  app: {
    baseURL: '/spotify-clone/',
    head: {
      title: 'Spotify Clone',
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Spotify Clone created with Nuxt 3'
        },
        {
          name: 'author',
          content: 'David Simón - @DeibidSE'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/spotify-clone/favicon.ico'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icons',
    'pinia-plugin-persistedstate/nuxt',
    'radix-vue/nuxt'
  ],
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'es', language: 'es-ES', name: 'Español de España (European Spanish)', file: 'es.json' },
      { code: 'en', language: 'en-GB', name: 'English (English)', file: 'en.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  css: ['@/assets/css/tailwind.css'],
  compatibilityDate: '2024-08-24'
})
