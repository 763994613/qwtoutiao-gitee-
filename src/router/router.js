import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import home from '@/views/home/home.vue'
import welcome from '@/views/welcome/welcome.vue'
import error from '@/views/error/error.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: login },
    { path: '/',
      component: home,
      children: [
        { name: 'welcome', path: '/', component: welcome }
      ] },
    { name: '404', path: '*', component: error }
  ]
})

router.beforeEach((to, from, next) => {
  const user = window.sessionStorage.getItem('qwId')
  if (to.path !== '/login' && !user) {
    return next('/login')
  }
  next()
})

export default router
