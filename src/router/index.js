import Vue from 'vue'
import Router from 'vue-router'
import PointOfSale from '@/components/PointOfSale'

Vue.use(Router)
// creates router
export default new Router({
  routes: [
    {
      path: '/',
      name: 'PointOfSale',
      component: PointOfSale
    }
  ]
})
