import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// cnpm install -g @vue/cli
// vue -V
// 终端中的文件夹下：
// vue create my-project
// 使用defult选项
// 之后系统会在该文件夹下创建一个叫做my-project的文件夹
// ----->终端中进入my-project下:<-----
// vue add router
// 第一个询问:提示提交git ->Y
// 第二个询问:使用history还是hash ->Y
// assets 资源文件夹
// components 组件文件夹
// router 路由表文件夹
// views 页面文件夹 该文件夹下的文件首字母大写
// App.vue 主页面(主组件)
// main.js 入口文件