console.log("hello world!");

for (var i = 0; i < 5; i++) {
  // setTimeout(function (i) {
  //   console.log(i);
  // }, 0);
  var l = i;
  exec(l, function (l) {
    console.log(l);
  })
}
console.log("end");

// 执行异步代码的2个条件  异步代码->事件队列
// 1、当前线程空闲——把当前程序栈中的同步代码执行完毕
// 2、达到触发条件

function exec(param, callback) {
  setTimeout((/*此处不能写param*/) => {
    // 这个箭头函数也不能直接写callback()
    callback(param);
  }, 0);
}