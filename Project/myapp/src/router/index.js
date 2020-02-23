import Vue from 'vue'
import VueRouter from 'vue-router'
import Animation from '../views/animation/Animation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Animation',
    component: Animation,
  }, {
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
