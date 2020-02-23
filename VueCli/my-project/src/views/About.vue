<template>
  <div class="about">
    <h1 class="active">This is an about page</h1>
    <h5>用户名:{{$store.state.usernameState.username}}</h5>
    <!-- <p>vuex-count:{{$store.state.count}}</p> -->
    <p>vuex-count:{{count}}</p>
    <!-- <h3>Getters Count:{{$store.getters.newCount}}</h3> -->
    <h3>Getters Count:{{newCount}}</h3>
    <!-- <button @click="addHandle">add</button> -->
    <button @click="add">add</button>
    <button @click="$store.commit('sub')">sub</button>
    <button @click="addAct">addAct</button>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
  methods: {
    addHandle() {
      console.log(this.$store.state.count);
      // 调用vuex下的函数修改count
      this.$store.commit("add");
    },
    //
    ...mapActions(["addAct"]),
    ...mapMutations(["add", "sub"])
  },
  computed: {
    // state要在computed下使用
    ...mapState(["count"]),
    ...mapGetters(["newCount"])
  }
};
</script>