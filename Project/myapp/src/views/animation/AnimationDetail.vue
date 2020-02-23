<!-- 番剧详情 -->
<template>
  <div>
    <header>
      {{detailData.title}} {{detailData.original_title}}
      <span>({{detailData.year}})</span>
    </header>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      detailData: {}
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getData(this.$route.params.id);
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    getData(id) {
      const BIRD_URL = "https://bird.ioliu.cn/v2?url=";
      const DETAIL_URL = "https://m.douban.com/rexxar/api/v2/tv/" + id;
      axios.get(BIRD_URL + DETAIL_URL).then(res => {
        this.detailData = res.data;
        // console.log(this.detailData);
        // 瑞克和莫迪的详情读不出来
      });
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
header {
  height: 60px;
  font-size: 26px;
  text-align: center;
  line-height: 60px;
}

header span {
  color: #888;
}
</style>