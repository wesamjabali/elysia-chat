// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: { "port": 5500 },
  ssr: false,
  css: ["@/assets/css/main.scss"],
})
