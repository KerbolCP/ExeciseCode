import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 预加载的引用代码

Vue.use(VueRouter)
// 切换页面的路由表
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
    // 预加载,切换效果快
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // 懒加载,首页面加载快
  },
  {
    path: '/mypage',
    // 引用指令,在App.vue的router-link中使用(网络路径)
    name: 'mypage',
    component: () => import('../views/MyPage.vue'),
    // 该页面的文件引用路径(文件组件)
    alias: '/topage'
    // 别名，网络路径topage也可以访问这个路由
    // beforeEnter: (to, from, next) => {
    //   // 路由守卫
    //   console.log(from, to);
    //   // 可以判断是否能够进入页面
    //   next();
    // }
  },
  {
    path: '/parentpage',
    name: 'ParentPage',
    component: () => import('../views/testPage/ParentPage.vue'),
    children: [
      {
        path: '/parentpage/child1/:username',
        name: 'child1',
        component: () => import('../views/testPage/ChildPage1.vue')
      },
      {
        path: '/parentpage/child2',
        name: 'child2',
        component: () => import('../views/testPage/ChildPage2.vue')
      }
    ]
  },
  {
    path: '/root',
    redirect: '/',
    // 重定向
  },
  {
    path: '/tochild1/:username',
    redirect: '/parentpage/child1/:username'
    // 重定向的传递参数
  },
  {
    path: '*',
    // 从我以上的路由都没匹配上时，最后匹配到这个路由
    component: () => import('../views/Error.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
