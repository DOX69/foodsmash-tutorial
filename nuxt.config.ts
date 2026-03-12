// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  modules: ['@nuxt/test-utils/module', '@nuxtjs/supabase'],
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL || 'http://127.0.0.1:54321',
    key: process.env.SUPABASE_KEY || 'your-anon-key',
    clientOptions: {
      db: {
        schema: 'foodsmash'
      }
    }
  }
})
