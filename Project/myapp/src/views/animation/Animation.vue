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
          <img :src="item.cover.url" crossorigin="use-credentials" />
        </div>
        <div class="right">
          <h3>{{ item.title }}</h3>
          <p class="rank"></p>
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
      dataList: [],
      start: 0,
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
    getDataList() {
      // 跨域访问(协议、域名、端口号 不同)
      // 由于 ->浏览器的同源策略<- 原则,禁止跨域访问
      const BIR_DURL = "https://bird.ioliu.cn/v2?url=";
      // 使用JsonBird服务器代理
      // const TVPLAY_DATAURL = `https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?start=${this.start}&count=10`;
      const ANIMATION_DATAURL = `https://m.douban.com/rexxar/api/v2/subject_collection/tv_animation/items?start=${this.start}&count=10`;
      axios
        .get(BIR_DURL + ANIMATION_DATAURL)
        .then((res) => {
          if (this.start >= res.data.total) {
            return;
          }
          // console.log("-> Get Data <-");
          // console.log(res);
          this.dataList = [
            ...this.dataList,
            ...res.data.subject_collection_items,
          ];
          this.start += 10;
          this.sending = false;
          console.log(this.start + "共" + res.data.total);
        })
        .catch(function () {
          console.error("DONT GET DATA");
          this.sending = false;
        });
    },
    listenScroll() {
      let dom = document.documentElement;
      window.onscroll = () => {
        // console.log("scrolling");
        let domHeight = dom.clientHeight; // 视口的高度
        let rollTop = dom.scrollTop; // 滚动的距离
        let rollHeight = dom.scrollHeight; // 可滚动区域的高度
        if (domHeight + rollTop >= rollHeight - 10) {
          if (!this.sending) {
            this.sending = true;
            // console.log("sending");
            this.getDataList();
          }
        }
      };
    },
    toDetail(id) {
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
</style>