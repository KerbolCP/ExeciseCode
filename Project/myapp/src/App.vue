<template>
  <div id="app">
    <div id="nav">
      <navigation />
    </div>
    <router-view />
  </div>
</template>

<script>
// 引入组件需要在script下用import通过路径引入
import Navigation from "@/components/Navigation.vue";
// @代表src文件夹下
export default {
  components: {
    // 引入的组件要在components下声明才可以在template下用标签使用
    Navigation
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

body {
  margin: 1.2rem 0;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
