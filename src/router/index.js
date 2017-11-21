import Vue from 'vue'
import Router from 'vue-router'

const ComponentList = require('../views/view-component-list.vue')
const DemoPage = require('../views/view-demo-page.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Component List',
      component: ComponentList
    },
    {
      path: '/:componentId',
      name: 'Component Demo',
      props: true,
      component: DemoPage
    }
  ]
})
