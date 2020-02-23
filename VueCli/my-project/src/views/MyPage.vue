<template>
  <div>
    <h1>测试页面</h1>
    <p class="active">{{str}}</p>
    <text-mod :ourName.sync="str"></text-mod>
    <!-- .sync代表该数据可被子组件修改 -->
  </div>
</template>

<script>
import textMod from "../components/test.vue";
export default {
  beforeRouteEnter(to, from, next) {
    console.log(from, to);
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 表单提交,当前某个必填项为空,禁止跳转
    console.log(from, to);
    next();
  },
  data() {
    return {
      str: "fellow37"
    };
  },
  methods: {},
  components: {
    // textMod: textMod,
    textMod
    // 引入组件
  }
};
</script>
<style scoped>
/* scoped 代表该css具有作用域 */
/* 非全局样式下禁止添加scoped */
.active {
  color: orange;
}
</style>