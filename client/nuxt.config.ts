// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: { "port": 5500 },
  ssr: false,
  css: ["@/assets/css/main.scss"],
  app: {
    head: {
      title: 'Chat',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height' },
      ],
    },
  },
})
