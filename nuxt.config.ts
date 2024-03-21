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
    baseURL: '/spotify-clone',
    buildAssetsDir: 'assets',
    head: {
      title: 'Clon de Spotify',
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
          content: 'Clon de Spotify hecho con Nuxt 3'
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
        lang: 'es'
      }
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/eslint-module',
    'radix-vue/nuxt',
    'nuxt-icons'
  ],
  css: ['@/assets/css/tailwind.css']
})
