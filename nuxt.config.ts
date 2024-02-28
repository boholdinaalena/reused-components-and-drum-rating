// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  url: "/testtask02/",
  css: ["~/assets/styles/main.scss"],
  modules: ["@pinia/nuxt", 'nuxt-icon', "@nuxt/image" , '@vee-validate/nuxt'],
});