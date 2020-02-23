const path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const glob = require("glob");
const PurifycssWebpack = require("purifycss-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// 配置文件
const entry = require("./webpack_config/webpack_entry");

module.exports = {
  // 生成文件的模式:开发模式与生产模式
  mode: "development",
  // entry: {
  //   // 入口路径，引入css通过此文件引入
  //   'index': './src/index.js'
  // },
  // 模块化配置项
  entry,
  output: {
    // 输出路径
    path: path.resolve(__dirname, 'dist'),
    // resolve地址拼接,__dirname根路径
    filename: '[name].js',
    // 设定被相对的路径
    publicPath: "http://127.0.0.1:8081/"
  },
  // 配置loader
  module: {
    // 将非js、json的文件解析
    rules: [
      {
        // css整合打包
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        // css分离打包
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { importLoaders: 1 },
          }, 'postcss-loader']
        })
      },
      {
        // css引用图片的打包
        test: /\.(jpg|png|gif)$/,
        use: [{
          loader: "url-loader",
          options: {
            // 小于limit(单位B)大小的图片会转为base64
            limit: 1024,
            // 输出图片文件夹的路径
            outputPath: "images/",
            // 使用es6的引用方式会出错
            esModule: false
          }
        }]
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.scss/,
        // sass分离打包
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  // 配置插件
  plugins: [
    // html打包
    new Webpack.HotModuleReplacementPlugin(),
    // 注释
    new Webpack.BannerPlugin(`最后打包于${new Date().toString()}KerbolCN`),
    // 引入第三方类库
    new Webpack.ProvidePlugin({
      $: "jquery"
    }),
    new HtmlWebpackPlugin({
      // 需要打包文件的入口路径
      template: "./src/index.html",
      // 使用哈希码防止重复,防止缓存
      hash: true,
      minify: {
        // 去除所有可去除的引号
        removeAttributeQuotes: true
      }
    }),
    // 多页面时，再new一个HtmlWebpackPlugin
    // css分离式打包,入口路径
    new ExtractTextWebpackPlugin("css/main.css"),
    new PurifycssWebpack({
      paths: glob.sync(path.join(__dirname, './src/*.html'))
    }),
    new CopyWebpackPlugin([{
      from: __dirname + "/src/manual",
      to: "./manual"
    }])
  ],
  // 开发服务功能
  devServer: {
    // 启动服务的路径,默认对该文件夹下的index.html文件启动网络协议
    contentBase: path.resolve(__dirname, 'dist'),
    // IP可以为'localhost'
    host: "127.0.0.1",
    // 端口号，防止冲突
    port: "8081",
    // 压缩代码以便快速启动
    compress: true,
    // 执行run dev时自动打开浏览器
    open: true,
    // 热更新:只编译局部更改的代码,不用每次编译全部文件
    hot: true
  }
}


// 备选解决方案
// 删除node_modules
// npm install

// 安装
// 在终端中打开根目录(此处为Webpack4文件夹)
// 终端中: npm init -y  (全程在webpack4中执行命令)
// 推荐本地安装(不推荐全局安装)
// 终端中: npm install webpack webpack-cli --save-dev
// 验证: 在package.json中的devDependencies出现"webpack","webpack-cli"
// 在package.json中：
// 将scripts中的内容替换为：
// "build": "webpack",
// "dev": "webpack-dev-server"
// 在根目录中创建此文件夹(webpack.config.js)
// 配置以上配置项
// 在根目录下新建以下两个文件夹
// dist(编译后的文件在此文件夹)  
// src(开发文件在此文件夹)

// 网络协议打开
// webpack4的终端中:npm install --save-dev webpack-dev-server
// html
// webpack4的终端中:npm install html-webpack-plugin --save-dev
// CSS嵌入js式
// webpack4的终端中:npm install --save-dev style-loader css-loader
// CSS分离式
// webpack4的终端中:npm install --save-dev extract-text-webpack-plugin@next
// 打包css中引用的图片
// webpack4的终端中:npm install --save-dev file-loader url-loader
// 打包html中的图片(走的Github源)
// webpack4的终端中:npm install html-withimg-loader --save-dev
// 打包sass
// webpack4的终端中:npm install --save-dev node-sass sass-loader
// CSS3前缀,类似-moz-、-webbit-
// webpack4的终端中:npm install --save-dev postcss-loader autoprefixer


/*****************************************************/
/**************** pdf里的babel命令已经过期 ************/
/*****************************************************/


// 安装package.json下的所有依赖包:npm install
// 安装package.json下的生产环境依赖包npm install --production

// 使用
// 在根目录下新建以下两个文件夹
// dist(生产文件在此文件夹) 
// src(开发文件在此文件夹)
// 在src中创建开发文件
// 在终端中打开根目录
// 先将文件打包: 终端中npm run build
// 再在网络协议中打开网页:终端中npm run dev
// 向上滚动找到蓝色的网页地址