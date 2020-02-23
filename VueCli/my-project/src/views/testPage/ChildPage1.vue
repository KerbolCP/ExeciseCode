<!--  -->
<template>
  <div>
    <h3>子路由页面1</h3>
    <p>姓名:{{$route.params.username}}</p>
    <!-- URL参数传递 -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    console.log(this.$route.params.username);
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>