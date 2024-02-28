// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/styles/main.scss"],
  modules: ["@pinia/nuxt", 'nuxt-icon', "@nuxt/image" , '@vee-validate/nuxt'],
});