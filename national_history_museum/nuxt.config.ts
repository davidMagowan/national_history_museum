// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from 'path'

export default defineNuxtConfig({
  allias:{
    '@': resolve(__dirname, "/"),
  },
  modules: ['nuxt-lodash'],
  css: [
    "~/assets/main.scss",
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
   postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  layouts: {
    default: "~/layouts/default.vue",
  },
  devtools: { enabled: true },
})
