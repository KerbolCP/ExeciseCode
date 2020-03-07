var http = require("http");

http.createServer(function (req, res) {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("hello world");
}).listen(3000);

console.log("server start port 3000");
console.log("http://localhost:3000");


// server--client 数据包=包头+包体
// statuscode 状态码
// req-- request res = response

// 三码一致  文件编码 浏览器解码 数据库编码
// ascii unicode utf-8 
// 中文编码:gbk bg2312 gb18030 utf-8
