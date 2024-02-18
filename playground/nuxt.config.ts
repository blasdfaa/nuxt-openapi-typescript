export default defineNuxtConfig({
  modules: ['../src/module'],
  runtimeConfig: {
    public: {
      test: 1
    }
  },
  generateApiConfig: {
    disable: false
  },
  devtools: { enabled: true }
})
