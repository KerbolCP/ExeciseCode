var http = require("http");
var url = require("url");
var fs = require("fs");

// var server = http.createServer(function () { });
// server.listen("8081", "127.0.104.1");

// chrome --> server 发包 request   请求包  req
// server --> chrome 发包 response  返回包  res
http.createServer(function (req, res) {

  // console.log(req);
  console.log(req.url);
  console.log(req.method); // http传输方式:get post put delete
  console.log(req.headers);

  var netpathname = url.parse(req.url).pathname;
  console.log("net" + netpathname);

  if (netpathname == "/favicon.ico") {
    return;
  }
  else if ("/" == netpathname || "/index" == netpathname) {
    // 1.发回去的文件路径
    var pathname = __dirname + '/' + url.parse("index.html").pathname;
    console.log("path" + pathname);

    // 2.通过文件路径把文件读取到内存(路径、编码方式)
    var indexData = fs.readFileSync(pathname, "utf-8");

    // 3.把读取到内存的数据，打成数据包发回(写包头 包尾)
    res.writeHead(200, { "Content-type": "text/html" }); // 文件类型
    res.end(indexData); // 发包
  }
  else if ("/img" == netpathname) {
    var pathname = __dirname + '/img/' + url.parse("QQ图片20191130091112.jpg").pathname;
    var imgData = fs.readFileSync(pathname);
    res.writeHead(200, { "Content-type": "image/jpeg" });
    res.end(imgData);
  }
  else {
    res.writeHead(404, { "Content-type": "text/plain" });
    res.end("404 Not Found");
  }
}).listen(3000);

console.log("server runing:http://localhost:3000");
