import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import home from '@/views/home/home.vue'
import welcome from '@/views/welcome/welcome.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: login },
    { path: '/',
      component: home,
      children: [
        { name: 'welcome', path: '/', component: welcome }
      ] }
  ]
})
export default router
