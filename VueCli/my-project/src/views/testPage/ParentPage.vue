<!--  -->
<template>
  <div>
    <h1>子路由测试页面</h1>
    <router-link to="/parentpage/child1/小明">子页面1</router-link>|
    <router-link v-bind:to="{name:'child2',params:{age:20}}">子页面2</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  beforeRouteUpdate(to, from, next) {
    // 使用在有子路由的页面中,切换子路由时
    console.log(from, to);
    next();
  },
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>