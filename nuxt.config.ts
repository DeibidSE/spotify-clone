// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  experimental: {
    viewTransition: true
  },
  eslint: { lintOnStart: false },
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
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/eslint-module',
    'radix-vue/nuxt',
    'nuxt-icons',
    '@nuxtjs/i18n'
  ],
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  css: ['@/assets/css/tailwind.css']
})
