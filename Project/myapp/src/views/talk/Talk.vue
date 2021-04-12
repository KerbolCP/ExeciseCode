<!-- 聊天模块 -->
<template>
  <div class="talk">
    <div class="home">
      <div class="message clearfix">
        <ul>
          <li
            v-for="(item, index) in message_queue"
            :key="index"
            :class="item.identity"
          >
            {{ item.mes }}
          </li>
        </ul>
      </div>
    </div>
    <div class="form-bar">
      <input
        type="text"
        placeholder="问题"
        v-model="input_text"
        @keyup.13="sendMessage"
      />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "md5";
export default {
  data() {
    return {
      input_text: "",
      message_queue: [],
    };
  },
  methods: {
    // 获得签名
    getReqSign(reqParams) {
      const APP_KEY = "";
      // Step.1 属性升序排列
      let N = Object.keys(reqParams).sort();
      // Step.2 按URL编码拼接字符串
      let T = "";
      N.map(function (val) {
        T += `${val}=${encodeURIComponent(reqParams[val])}&`;
      });
      // Step.3 拼接秘钥
      let S = T + "app_key=" + APP_KEY;
      // Step.4 md5加密，并转换大写
      let sign = md5(S).toUpperCase();
      console.log(sign);
      return sign;
    },
    // 获得参数
    getReqParams() {
      const APP_ID = 0;
      let reqParams = {
        app_id: APP_ID,
        time_stamp: Date.parse(new Date()) / 1000,
        nonce_str: Math.random().toString(16).slice(2),
        session: "10000",
        question: this.input_text,
      };
      reqParams.sign = this.getReqSign(reqParams);
      return reqParams;
    },

    sendMessage() {
      let reqParams = this.getReqParams();

      console.log(reqParams);

      const BIRD_URL = "https://bird.ioliu.cn/v2?url=";
      const NLP_TEXTCHAT_URL =
        "https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat";
      axios
        .get(BIRD_URL + NLP_TEXTCHAT_URL, {
          params: reqParams,
        })
        .then((res) => {
          console.log(res);
          this.message_queue.push({
            mes: res.data.data.answer,
            identity: "AI-message",
          });
        });

      this.message_queue.push({
        mes: this.input_text,
        identity: "user-message",
      });
      this.input_text = "";
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.talk {
  margin-bottom: 2.4rem;
}

.form-bar {
  position: fixed;
  width: 100%;
  height: 1rem;
  bottom: 1.2rem;
  background-color: #ccc;
  text-align: center;
  line-height: 0.5rem;
  overflow: hidden;
}

.home .message {
  width: 100%;
  height: 100%;
  font-size: 20px;
}
.home .message .AI-message {
  width: 70%;
  float: left;
}
.home .user-message {
  width: 70%;
  float: right;
  text-align: right;
}
.form-bar input {
  height: 0.8rem;
  width: 80%;
  margin-top: 0.05rem;
  font-size: 20px;
  float: left;
}

.form-bar button {
  width: 15%;
  height: 0.6rem;
}
</style>