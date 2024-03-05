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
    baseURL: '/spotify-clone'
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
