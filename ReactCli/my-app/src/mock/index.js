import Mock, { Random } from 'mockjs'

Mock.mock("https://www.baidu.com/getuser", {
  "dataList|10": [
    {
      "username": "小明",
      "string|1-10": "*",
      // 重复后面的内容1-10遍(随机)
      "date": "@date(yyyy-MM-dd)",
      "lastname": "@cname",
      "address": "@county(true)"
    }
  ]
})

const dataListBuilder = () => {
  let arr = [];
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj = {
      "avatar": Random.dataImage("100x100", Random.cname())
    }
    arr.push(obj);
  }
  return arr;
}
Mock.mock("https://www.taobao.com/register", {
  "dataList": dataListBuilder()
})