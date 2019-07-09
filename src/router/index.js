import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // { name: 'log', path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: login }
  ]
})
export default router
