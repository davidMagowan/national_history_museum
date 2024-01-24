

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar, faCircle, faFish, faEarthEurope, faCaretRight } from '@fortawesome/free-solid-svg-icons'

library.add(faStar, faCircle, faFish, faEarthEurope, faCaretRight)

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})