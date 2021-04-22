<!-- 聊天模块 -->
<template>
  <div class="talk">
    <div class="home">
      <!-- 消息 -->
      <div class="message clearfix">
        <ul>
          <!-- 展示消息内容，用class控制各自的样式 -->
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
    <!-- 输入框 -->
    <div class="form-bar">
      <input
        type="text"
        placeholder="问题"
        v-model="input_text"
        @keyup.13="sendMessage"
      />
      <button type="info" class="btn" @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "md5";
export default {
  data() {
    return {
      // 输入的内容
      input_text: "",
      // 聊天内容
      message_queue: [],
    };
  },
  updated() {
    // 重新渲染文档时，将屏幕顶部设置为屏幕的高度，可以保持对话记录在最底部
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
  },
  methods: {
    // 根据接口鉴权文档，获得签名
    // https://ai.qq.com/doc/nlpchat.shtml
    // 获得签名
    getReqSign(reqParams) {
      const APP_KEY = "ihThXMLP0vAr9r6y";
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
      // 返回签名
      return sign;
    },
    // 获得参数
    getReqParams() {
      // APPID应用标识
      const APP_ID = 2128678409;
      let reqParams = {
        app_id: APP_ID,
        // 秒级时间戳
        time_stamp: Date.parse(new Date()) / 1000,
        // 16进制随机字符串
        nonce_str: Math.random().toString(16).slice(2),
        // 会话标识（应用内唯一）
        session: "10000",
        // 用户输入的聊天内容
        question: this.input_text,
      };
      // 添加签名
      reqParams.sign = this.getReqSign(reqParams);
      return reqParams;
    },
    // 发送消息
    sendMessage() {
      // 获得参数
      let reqParams = this.getReqParams();

      console.log(reqParams);
      // JsonBird代理地址，解决跨域问题
      const BIRD_URL = "https://bird.ioliu.cn/v2?url=";
      // 腾讯AI智能闲聊接口
      const NLP_TEXTCHAT_URL =
        "https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat";
      // 使用axois发送请求
      axios
        .get(BIRD_URL + NLP_TEXTCHAT_URL, {
          // 向请求中传入参数
          params: reqParams,
        })
        .then((res) => {
          console.log(res);
          this.message_queue.push({
            // 消息内容
            mes: res.data.data.answer,
            // 返回的消息标记为AI
            // 方便使用CSS控制样式
            identity: "AI-message",
          });
        });

      this.message_queue.push({
        mes: this.input_text,
        // 用户输入的消息标记为user
        identity: "user-message",
      });
      // 发送消息完成后，置输入框为空
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
  overflow: hidden;
  border-radius: 4px;
}
.home .message .AI-message {
  width: 70%;
  float: left;
  margin-bottom: 10px;
}
.home .user-message {
  width: 70%;
  float: right;
  text-align: right;
  margin-bottom: 10px;
}
.form-bar input {
  height: 0.8rem;
  width: 80%;
  margin-top: 0.05rem;
  font-size: 20px;
  float: left;
}

.form-bar .btn {
  width: 17%;
  height: 0.7rem;
  text-align: center;
  outline: 0;
  font-weight: 500;
  font-size: 0.3rem;
  color: #fff;
  background-color: #a6a9ad;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.clearfix::after {
  clear: both;
  display: block;
  content: "";
}
</style>