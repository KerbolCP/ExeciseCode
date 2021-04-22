<!-- 音乐页面 -->
<template>
  <div class="misic-player">
    <!-- 使用Vue-Aplayer音乐播放组件 -->
    <!-- https://vue-aplayer.js.org/ -->
    <!-- music读取储存的音乐信息 -->
    <aplayer :music="playMusic" class="player" />
    <ul class="list">
      <li class="title">
        <div class="index"></div>
        <div class="name">歌曲标题</div>
        <div class="time">时长</div>
        <div class="artist">歌手</div>
      </li>
      <li
        v-for="(item, index) in musicList"
        :key="item.id"
        @click="clickMusic(item.id)"
      >
        <div class="index">{{ index + 1 }}</div>
        <div class="name">{{ item.name }}</div>
        <div class="time">
          {{ "0" + Math.floor(item.dt / 60000) }}:{{
            Math.floor((item.dt / 1000) % 60) > 9
              ? Math.floor((item.dt / 1000) % 60)
              : "0" + Math.floor((item.dt / 1000) % 60)
          }}
        </div>
        <div class="artist">{{ item.ar[0].name }}</div>
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
      // 音乐信息列表
      musicList: [],
      // 当前播放音乐的信息
      playMusic: {
        title: "东西（Cover：林俊呈）",
        artist: "纳豆",
        src: "https://cdn.moefe.org/music/mp3/thing.mp3",
        pic:
          "https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300",
      },
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // 获得播放列表
    this.getDataList();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    getDataList() {
      // 网易云音乐列表的id
      const LISTID = "playlist?id=19723756";
      const URL = "https://bird.ioliu.cn/netease/";
      // 请求数据
      axios
        .get(URL + LISTID)
        .then((res) => {
          console.log(res);
          console.log(res.data.playlist.tracks);
          this.musicList = res.data.playlist.tracks;
        })
        .catch(() => {
          console.error("DONT GET MUSIC_DATA");
        });
    },
    clickMusic(id) {
      // 不能直接在src里填写"https://bird.ioliu.cn/netease/song?id=" + id
      // 要通过get请求一次数据后，从本地播放
      const MUSIC_URL = "https://bird.ioliu.cn/netease/song?id=" + id;
      axios.get(MUSIC_URL).then((res) => {
        console.log(res);
        this.playMusic = {
          // 标题
          title: res.data.data.name,
          // 歌手
          artist: res.data.data.ar[0].name,
          // 音频文件
          src: res.data.data.mp3.url,
          // 封面
          pic: res.data.data.al.picUrl,
        };
      });
    },
  },
  // 引入aplayer组件
  components: {
    aplayer,
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.player {
  width: 100%;
  height: 1.3rem;
  margin: 0;
  position: fixed;
  top: 1.2rem;
}

.list {
  font-size: 0.4rem;
  margin: 2.6rem 5px 0;
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
  /* flex: 1; */
  padding-right: 0.1rem;
  /* 使用flex浏览器会自动推算 */
}

.list li .name {
  flex: 7;
}

.list li .time {
  flex: 2;
}

.list li .artist {
  flex: 3;
}
</style>