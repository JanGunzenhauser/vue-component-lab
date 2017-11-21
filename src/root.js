import Vue from 'vue'
import router from './router'
import svgicon from 'vue-svgicon'
import App from './app.vue'
Vue.use(svgicon, { tagName: 'icon'})

const hub = new Vue()
const app = new Vue({
  router,
  ...App
})

export { app, router, hub }
