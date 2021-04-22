<!-- 番剧模块 -->
<template>
  <div>
    <ul>
      <li
        class="clearfix"
        v-for="item in dataList"
        :key="item.id"
        @click="toDetail(item.id)"
      >
        <div class="left">
          <!-- 代理图片，跨越防盗链 -->
          <!-- <img :src="'https://images.weserv.nl/?url=' + item.cover.url" /> -->
          <!-- 属性referrerPolicy="no-referrer" 跨越防盗链 -->
          <img :src="item.cover.url" referrerPolicy="no-referrer" />
        </div>
        <div class="right">
          <h3>{{ item.title }}</h3>
          <!-- Element-UI评分组件 -->
          <!-- https://element.eleme.cn/#/zh-CN/component/rate -->
          <el-rate
            class="rate"
            v-if="item.rating"
            v-model="item.rating.value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>

          <p class="rank" v-else>
            {{ item.null_rating_reason }}
          </p>
          <div></div>
          <p class="meta">{{ item.info }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 储存请求的数据
      dataList: [],
      // 起始条数，请求需要发送起始条数和个数
      start: 0,
      // 节流标志位，当标志位为true时，不发送请求
      sending: false,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getDataList();
    this.listenScroll();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // 获得数据
    getDataList() {
      // 跨域访问(协议、域名、端口号 不同)
      // 由于 ->浏览器的同源策略<- 原则,禁止跨域访问
      const BIR_DURL = "https://bird.ioliu.cn/v2?url=";
      // 使用JsonBird服务器代理
      // 剧集的接口
      // const TVPLAY_DATAURL = `https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?start=${this.start}&count=10`;
      // 动漫的接口
      const ANIMATION_DATAURL = `https://m.douban.com/rexxar/api/v2/subject_collection/tv_animation/items?start=${this.start}&count=10`;
      axios
        .get(BIR_DURL + ANIMATION_DATAURL)
        .then((res) => {
          if (this.start >= res.data.total) {
            return;
          }
          console.log(res.data.subject_collection_items);
          // 修改评分数，将上限为10的评分修改为上限为5，适配el-rate组件
          res.data.subject_collection_items.map((val) => {
            if (val.rating) {
              val.rating.value = (val.rating.value / 2).toFixed(1);
            }
          });
          // 获得的数据添加至dataList数据列表里，使用了ES6的扩展运算符
          this.dataList = [
            ...this.dataList,
            ...res.data.subject_collection_items,
          ];
          // 请求完数据，需要将起始条数+10
          this.start += 10;
          // 请求结束，置请求标志位为false
          this.sending = false;
          console.log("当前" + this.start + "共" + res.data.total + "条");
        })
        .catch(function () {
          console.error("DONT GET DATA");
          this.sending = false;
        });
    },
    listenScroll() {
      let dom = document.documentElement;
      window.onscroll = () => {
        let domHeight = dom.clientHeight; // 视口的高度
        let rollTop = dom.scrollTop; // 滚动的距离
        let rollHeight = dom.scrollHeight; // 可滚动区域的高度
        console.log("视口的高度" + domHeight);
        console.log("滚动的距离" + rollTop);
        console.log("可滚动区域的高度" + rollHeight);
        // 当滚动触底时，请求新的数据
        if (domHeight + rollTop >= rollHeight - 10) {
          // 节流判断，判断当前是否在等待数据，若在等待数据则不继续请求
          if (!this.sending) {
            // 发送数据时，置发送标志位为true，达到节流的功能，防止反复发送请求
            this.sending = true;
            this.getDataList();
          }
        }
      };
    },
    toDetail(id) {
      // 跳转页面
      this.$router.push("/animationdetail/" + id);
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
li {
  padding: 20px 4%;
}
li::after {
  width: 100%;
  height: 1px;
  background-color: #ccc;
}
.left {
  width: 100px;
  margin-right: 15px;
  float: left;
}
.left img {
  width: 100%;
}
.right {
  overflow: hidden;
}
.right h3 {
  font-size: 20px;
}

.right .meta {
  font-size: 15px;
  color: #9b9b9b;
}

.right .rate {
  position: relative;
  bottom: 0.4rem;
}

.right .rank {
  color: rgb(255, 153, 0);
  font-size: 14px;
  vertical-align: middle;
}
</style>