import Vue from 'vue'
import VueRouter from 'vue-router'
import Animation from '../views/animation/Animation.vue'

Vue.use(VueRouter)
// 路由配置
const routes = [
  {
    path: '/',
    name: 'Animation',
    component: Animation,
  }, {
    // ':'后接数据，可实现通过URL传递参数，能够通过router获得到冒号后面的数据
    path: '/animationdetail/:id',
    name: 'AnimationDetail',
    component: () => import('../views/animation/AnimationDetail.vue')
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import('../views/music/Music.vue')
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import('../views/book/Book.vue')
  },
  {
    path: '/talk',
    name: 'Talk',
    component: () => import('../views/talk/Talk.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
