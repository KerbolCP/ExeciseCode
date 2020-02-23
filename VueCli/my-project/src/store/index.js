import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const stateMod = {
  state: {
    username: "小明"
  }
}

export default new Vuex.Store({
  state: {
    // 变量池,类似data,修改时必须通过vuex修改
    count: 0
  },
  mutations: {
    // 修改state里的数据函数要在这里
    add(state) {
      state.count++;
    },
    sub(state) {
      state.count--;
    }
  },
  // computed数据监听
  getters: {
    newCount(state) {
      return state.count * 10;
    }
  },
  actions: {
    // 异步方法在这里写，最后必须调用mutations
    addAct({ commit }) {
      commit("add");
    }
  },
  modules: {
    usernameState: stateMod
  }
})
