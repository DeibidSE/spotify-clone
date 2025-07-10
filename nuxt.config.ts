// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxt/eslint',
		'@nuxtjs/i18n',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'nuxt-icons',
		'pinia-plugin-persistedstate/nuxt',
		'radix-vue/nuxt',
	],
	ssr: false,
	devtools: { enabled: false },
	app: {
		baseURL: '/spotify-clone/',
		head: {
			title: 'Spotify Clone',
			meta: [
				{
					charset: 'utf-8',
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					hid: 'description',
					name: 'description',
					content: 'Spotify Clone created with Nuxt 3',
				},
				{
					name: 'author',
					content: 'David Simón - @DeibidSE',
				},
			],
			link: [
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/spotify-clone/favicon.ico',
				},
			],
			htmlAttrs: {
				lang: 'en',
			},
		},
	},
	css: ['@/assets/css/tailwind.css'],
	runtimeConfig: {
		public: {
			BASE_URL: '/spotify-clone',
		},
	},
	experimental: {
		viewTransition: true,
	},
	compatibilityDate: '2024-08-24',
	nitro: {
		imports: {
			exclude: [/.*.nuxt\/dist\/server.*/],
		},
	},
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
			},
		},
	},
	i18n: {
		strategy: 'no_prefix',
		defaultLocale: 'en',
		locales: [
			{ code: 'es', language: 'es-ES', name: 'Español de España (European Spanish)', file: 'es.json' },
			{ code: 'en', language: 'en-GB', name: 'English (English)', file: 'en.json' },
		],
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root',
		},
	},
})
