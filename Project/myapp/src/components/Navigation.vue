<!-- 公共导航栏 -->
<template>
  <div v-bind:class="['container', nowNav.name]">
    <header>
      <span>首页</span>
      <p>{{ nowNav.title }}</p>
    </header>
    <nav>
      <ul>
        <li @click="toPage(item)" v-bind:key="item.id" v-for="item in navList">
          {{ item.title }}
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowNav: {
        id: 0,
        title: "番剧",
        path: "/",
        name: "animation",
      },
      navList: [
        {
          id: 0,
          title: "番剧",
          path: "/",
          name: "animation",
        },
        {
          id: 1,
          title: "音乐",
          path: "/music",
          name: "music",
        },
        // {
        //   id: 2,
        //   title: "书籍",
        //   path: "/book",
        //   name: "book"
        // },
        {
          id: 3,
          title: "聊天",
          path: "/talk",
          name: "talk",
        },
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // 1、存储navList的下标
    // 2、将对象存储成JSON
    let storageNav = sessionStorage.getItem("nowNav");
    this.nowNav = storageNav ? JSON.parse(storageNav) : this.navList[0];
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    toPage(item) {
      if (this.nowNav.name != item.name) {
        this.$router.push(item.path);
        sessionStorage.setItem("nowNav", JSON.stringify(item));
        // 1、存储navList的下标
        // 2、将对象存储成JSON
        this.nowNav = item;
      }
    },
  },
};
</script>
<style scoped>
.animation header,
.animation nav {
  background-color: rgb(1, 175, 253);
}
.music header,
.music nav {
  background-color: rgb(221, 0, 27);
}
.book header,
.book nav {
  background-color: rgb(97, 78, 60);
}
.talk header,
.talk nav {
  background-color: rgb(0, 173, 25);
}
header,
nav {
  width: 100%;
  height: 1.2rem;
  color: #000;
  position: fixed;
}
header {
  top: 0;
}
nav {
  bottom: 0;
}
header span {
  font-size: 0.4rem;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

header p {
  font-size: 0.7rem;
  text-align: center;
}
nav ul {
  display: flex;
  height: 100%;
  align-items: center;
}

nav li {
  height: 100%;
  line-height: 200%;
  font-size: 0.6rem;
  flex-grow: 1;
  text-align: center;
}
</style>