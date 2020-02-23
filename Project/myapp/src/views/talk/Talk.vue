<!-- 聊天模块 -->
<template>
  <div class="talk">
    <div class="form-bar">
      <input type="text" placeholder="问题" v-model="input_text" @keyup.13="sendMessage" />
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
      message_queue: []
    };
  },
  methods: {
    /***************************************---> 老师代码 start <---*************************************/
    //生成时间戳
    getTimeStamp() {
      let timer = new Date();
      timer = Date.parse(timer);
      timer = timer.toString().substr(0, 10);
      timer = Number.parseInt(timer);
      return timer;
    },
    // 生成16进制随机字符串
    getNonceStr() {
      let str = Math.random();
      str = str.toString(16);
      str = str.substr(2);
      return str;
    },
    getSign(obj) {
      //第一步将<key, value>请求参数对按key进行字典升序排序，得到有序的参数对列表N
      let arr = Object.keys(obj).sort();
      //第二部 对排列后的对象进行url格式拼接
      let str = "";
      arr.map(function(val) {
        str += `${val}=${encodeURI(obj[val])}&`;
      });
      //第三步 将应用密钥以app_key为键名，组成URL键值拼接到字符串T末尾
      str += "app_key=ihThXMLP0vAr9r6y";
      //第四步 对字符串进行MD5运算，将得到的MD5值所有字符转换成大写
      str = md5(str).toUpperCase();
      // 第五步返回结果
      return str;
    },
    /***************************************---> 老师代码 end <---*************************************/
    /* */
    /* */
    /* */
    /***************************************---> 我的代码 start <---*************************************/
    // 获得签名
    getReqSign(reqParams) {
      const APP_KEY = "ihThXMLP0vAr9r6y";
      // Step.1 属性升序排列
      let N = Object.keys(reqParams).sort();
      // Step.2 按URL编码拼接字符串
      let T = "";
      N.map(function(val) {
        T += `${val}=${encodeURIComponent(reqParams[val])}&`;
      });
      // Step.3 拼接秘钥
      let S = T + "app_key=" + APP_KEY;
      // Step.4 md5加密，并转换大写
      let sign = md5(S).toUpperCase();
      return sign;
    },
    // 获得参数
    getReqParams() {
      const APP_ID = 2128678409;
      let reqParams = {
        app_id: APP_ID,
        time_stamp: this.getTimeStamp(),
        // time_stamp: Date.parse(new Date()) / 1000,
        // nonce_str: Math.random()
        //   .toString(16)
        //   .slice(2),
        nonce_str: this.getNonceStr(),
        session: "10000",
        question: this.input_text
      };
      reqParams.sign = this.getReqSign(reqParams);
      return reqParams;
    },
    /***************************************---> 我的代码 end <---*************************************/

    sendMessage() {
      // ↓↓↓↓↓ 我的参数 ↓↓↓ reqParams ↓↓↓↓↓
      let reqParams = this.getReqParams();

      // ↓↓↓↓↓ 老师的参数 ↓↓↓ params ↓↓↓↓↓
      let params = {
        app_id: 2128678409,
        time_stamp: this.getTimeStamp(),
        nonce_str: reqParams.nonce_str,
        session: "10001",
        question: this.input_text
      };
      params.sign = this.getSign(params);

      console.log("我的参数reqParams", reqParams);
      console.log("老师参数params", params);

      const BIRD_URL = "https://bird.ioliu.cn/v2?url=";
      const NLP_TEXTCHAT_URL =
        "https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat";
      axios
        .get(BIRD_URL + NLP_TEXTCHAT_URL, {
          params: reqParams
        })
        .then(res => {
          console.log("我的结果", res);
        });
      axios
        .get(BIRD_URL + NLP_TEXTCHAT_URL, {
          params
        })
        .then(res => {
          console.log("老师结果", res);
        });
      this.input_text = "";
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
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