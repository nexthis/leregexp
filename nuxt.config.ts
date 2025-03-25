// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: process.env.NODE_ENV === 'production',
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss'
  ],

  tailwindcss: {
    cssPath: '~/assets/scss/index.scss',
  },
})

