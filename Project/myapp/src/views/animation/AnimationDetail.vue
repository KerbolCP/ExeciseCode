<!-- 番剧详情 -->
<template>
  <div>
    <header>
      <div class="header-content clearfix">
        <img :src="detailData.cover_url" referrerPolicy="no-referrer" />
        <div class="sub-detail">
          <div class="detail-title">
            {{ detailData.title }}
          </div>
          <div class="detail-original">
            {{ detailData.original_title }} ({{ detailData.year }})
          </div>
          <div class="sub-meta">
            {{ detailData.countries[0] }} /
            <span v-for="item in detailData.genres" :key="item.id">
              {{ item }} /
            </span>
            {{ detailData.pubdate[0] }} 上映
            {{
              detailData.durations.length == 0
                ? ""
                : "/ 片长 " + detailData.durations[0]
            }}
            <!-- Element-UI评分组件 -->
            <!-- https://element.eleme.cn/#/zh-CN/component/rate -->
            <el-rate
              class="rate"
              v-if="detailData.rating"
              v-model="detailData.rating.value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </div>
        </div>
      </div>
    </header>
    <div class="summary">
      <h2>剧集简介</h2>
      <p>{{ detailData.intro }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      detailData: {},
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
      // JsonBird代理
      const BIRD_URL = "https://bird.ioliu.cn/v2?url=";
      // 剧集详情信息的接口
      const DETAIL_URL = "https://m.douban.com/rexxar/api/v2/tv/" + id;
      axios.get(BIRD_URL + DETAIL_URL).then((res) => {
        if (res.data.rating) {
          res.data.rating.value = (res.data.rating.value / 2).toFixed(1);
        }
        this.detailData = res.data;
        console.log(this.detailData);
      });
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
h2 {
  color: #818181;
  margin: 0 0 15px;
  font-weight: normal;
  font-size: 15px;
}

header .header-content {
  padding: 20px 15px 15px;
  background-color: rgb(103, 113, 127);
}

header .header-content img {
  width: 100px;
  height: 140px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 5px 10px rgb(0 0 0 / 15%);
  float: left;
}

header .header-content .sub-detail {
  margin-left: 115px;
  line-height: 1.4;
  min-height: 140px;
  position: relative;
  z-index: 1;
  color: #fff;
}

.header-content .sub-detail .detail-title {
  font-size: 23px;
}

.header-content .sub-detail .detail-original {
  font-size: 15px;
}
.header-content .sub-detail .sub-meta {
  color: rgba(255, 255, 255, 0.7);
  font-size: 11px;
  padding: 5px 0 5px;
}

.summary,
.pics {
  margin: 15px 18px 20px;
}

.summary p {
  font-size: 15px;
  color: #191919;
  line-height: 22px;
  margin: 0;
  padding: 0;
}

.clearfix {
  clear: both;
  display: block;
  content: "";
}
</style>