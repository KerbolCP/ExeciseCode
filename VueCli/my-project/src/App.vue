<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/mypage">MyPage</router-link>|
      <router-link to="/parentpage">ParentPage</router-link>|
      <router-link to="/root">返回首页</router-link>|
      <router-link to="/tochild1/小刚">快速跳转至child2</router-link>|
      <router-link to="/topage">我的页面</router-link>|
      <span @click="jumpHandle">编程式导航</span>
      <!-- router-link 实现异步跳转 -->
    </div>
    <div class="box">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
    <!-- router-view 组件切换的位置,显示在页面的什么位置 -->
  </div>
</template>

<script>
export default {
  methods: {
    jumpHandle() {
      this.$router.push("mypage");
      // push里写网络(路由)路径
    }
  }
};
</script>

<style scoped>
.box {
  position: relative;
}
/* 进入页面的状态 */
.fade-enter {
  /* 刚进入时 */
  transform: translateX(100%);
}
.fade-enter-active {
  /* 运行中时 */
  transition: all 1s ease;
  position: absolute;
  top: 0;
  width: 100%;
}
.fade-enter-to {
  /* 进入结束 */
  transform: translateX(0);
}
/* 离开页面的状态 */
.fade-leave {
  transform: translateX(0);
}
.fade-leave-active {
  transition: all 1s ease;
  position: absolute;
  top: 0;
  width: 100%;
  /* width防止宽度塌陷 */
}
.fade-leave-to {
  transform: translateX(-100%);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.active {
  color: blue;
}
</style>
