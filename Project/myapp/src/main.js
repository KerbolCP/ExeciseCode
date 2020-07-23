import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/rem'
// 引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 番剧  https://api.bilibili.com/pgc/web/timeline?types=1 
// 番剧最新 https://api.bilibili.com/pgc/web/timeline/v2?season_type=1

// 国创  https://api.bilibili.com/pgc/web/timeline?types=4
// 国创最新 https://api.bilibili.com/pgc/web/timeline/v2?season_type=4

// 番剧点评 https://api.bilibili.com/pgc/review/relate?media_id=28224129 