import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import home from '@/views/home/home.vue'
import welcome from '@/views/welcome/welcome.vue'
import error from '@/views/error/error.vue'
import document from '@/views/document/document.vue'
import images from '@/views/images/images.vue'
import news from '@/views/news/news.vue'
import comment from '@/views/comment/comment.vue'
import setting from '@/views/setting/setting.vue'
import fans from '@/views/fans/fans.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    { name: 'login', path: '/login', component: login },
    { path: '/',
      component: home,
      children: [
        { name: 'welcome', path: '/', component: welcome },
        { name: 'document', path: '/document', component: document },
        { name: 'images', path: '/images', component: images },
        { name: 'news', path: '/news', component: news },
        { name: 'comment', path: '/comment', component: comment },
        { name: 'setting', path: '/setting', component: setting },
        { name: 'fans', path: '/fans', component: fans }
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
