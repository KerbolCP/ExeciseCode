// 外部文件通过此文件穿件关联
import css from "./css/main.css";
// 这样引用css文件，会被打包到js里
// 在添加分离打包后并不会，但要通过js引用css
import scss from "./style/test.scss";
// 引用node_modules中的包，不需要写路径
// 引用第三方类库可以在config中引用
// import $ from "jquery";
// json在此引入
import data from "./data.json";

window.onload = function () {
  let str = "hello";
  let obj_div1 = document.getElementById("div1");
  obj_div1.innerText = str;
  console.log(str);
  console.log("hello world");
  let showData = () => {
    let today = new Date();
    console.log(today);
    console.log(today.toString());
  }
  showData();
  $("#div3").text(`姓名：${data.name} 职业：${data.job} 年龄：${data.age}`);
  console.log(data);
}
