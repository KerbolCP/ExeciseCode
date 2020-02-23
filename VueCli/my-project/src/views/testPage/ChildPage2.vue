<!--  -->
<template>
  <div>
    <h3>子路由测试页面2</h3>
    <p>年龄:{{$route.params.age}}</p>
    <!-- params传递参数 -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    console.log(this.$route.params.age);
    // JS取得params参数
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>