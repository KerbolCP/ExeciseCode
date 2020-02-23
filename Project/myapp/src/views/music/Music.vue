<!-- 音乐页面 -->
<template>
  <div class="misic-player">
    <aplayer :music="playMusic" />
    <ul class="list">
      <li class="title">
        <div class="index"></div>
        <div class="name">歌曲标题</div>
        <div class="time">时长</div>
        <div class="artist">歌手</div>
      </li>
      <li v-for="(item, index) in musicList" :key="item.id" @click="clickMusic(item.id)">
        <div class="index">{{index+1}}</div>
        <div class="name">{{item.name}}</div>
        <div class="time">{{Math.floor(item.dt/60000)}}:{{Math.floor((item.dt/1000)%60)}}</div>
        <div class="artist">{{item.ar[0].name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import aplayer from "vue-aplayer";
import axios from "axios";
export default {
  data() {
    return {
      musicList: [],
      playMusic: {
        title: "东西（Cover：林俊呈）",
        artist: "纳豆",
        src: "https://cdn.moefe.org/music/mp3/thing.mp3",
        pic:
          "https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300"
      }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getDataList();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    getDataList() {
      // const LISTID = "playlist?id=390085539";  // 我喜欢的音乐
      const LISTID = "playlist?id=3149474254"; // 2019年度歌单
      const URL = "https://bird.ioliu.cn/netease/";
      axios
        .get(URL + LISTID)
        .then(res => {
          this.musicList = res.data.playlist.tracks;
        })
        .catch(() => {
          console.error("DONT GET MUSICDATA");
        });
    },
    clickMusic(id) {
      // 不能直接在src里填写"https://bird.ioliu.cn/netease/song?id=" + id
      // 要通过get请求一次数据后，从本地播放
      const MUSIC_URL = "https://bird.ioliu.cn/netease/song?id=" + id;
      axios.get(MUSIC_URL).then(res => {
        this.playMusic = {
          title: res.data.data.name,
          artist: res.data.data.ar[0].name,
          src: res.data.data.mp3.url,
          pic: res.data.data.al.picUrl
        };
      });
    }
  },
  components: {
    aplayer
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.list {
  font-size: 0.4rem;
  margin: 0 5px;
}
.list .title {
  font-weight: bolder;
}
.list li {
  display: flex;
}

.list li:nth-child(even) {
  background-color: #ebeced;
}

.list li div {
  /* flex-basis: 100%; */
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list li .index {
  flex: 1;
  /* 使用flex浏览器会自动推算 */
}

.list li .name {
  flex: 8;
}

.list li .time {
  flex: 2;
}

.list li .artist {
  flex: 3;
}
</style>