version 1.0.0
 备选解决方案
 删除node_modules
 npm install

 安装
 在终端中打开根目录(此处为Webpack4文件夹)
 终端中: npm init -y  (全程在webpack4中执行命令)
 推荐本地安装(不推荐全局安装)
 终端中: npm install webpack webpack-cli --save-dev
 验证: 在package.json中的devDependencies出现"webpack","webpack-cli"
 在package.json中：
 将scripts中的内容替换为：
 "build": "webpack",
 "dev": "webpack-dev-server"
 在根目录中创建此文件夹(webpack.config.js)
 配置以上配置项
 在根目录下新建以下两个文件夹
 dist(编译后的文件在此文件夹)  
 src(开发文件在此文件夹)

 网络协议打开
 webpack4的终端中:npm install --save-dev webpack-dev-server
 html
 webpack4的终端中:npm install html-webpack-plugin --save-dev
 CSS嵌入js式
 webpack4的终端中:npm install --save-dev style-loader css-loader
 CSS分离式
 webpack4的终端中:npm install --save-dev extract-text-webpack-plugin@next
 打包css中引用的图片
 webpack4的终端中:npm install --save-dev file-loader url-loader
 打包html中的图片(走的Github源)
 webpack4的终端中:npm install html-withimg-loader --save-dev
 打包sass
 webpack4的终端中:npm install --save-dev node-sass sass-loader
 CSS3前缀,类似-moz-、-webbit-
 webpack4的终端中:npm install --save-dev postcss-loader autoprefixer


*****************************************************
**************** pdf里的babel命令已经过期 ************
*****************************************************


 安装package.json下的所有依赖包:npm install
 安装package.json下的生产环境依赖包npm install --production

 使用
 在根目录下新建以下两个文件夹
 dist(生产文件在此文件夹) 
 src(开发文件在此文件夹)
 在src中创建开发文件
 在终端中打开根目录
 先将文件打包: 终端中npm run build
 再在网络协议中打开网页:终端中npm run dev
 向上滚动找到蓝色的网页地址