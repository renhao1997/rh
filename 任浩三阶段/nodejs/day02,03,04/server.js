//引入express模块:先安装express: npm i express
let express = require('express');

//引入json解析中间件
let bodyParser = require('body-parser');
const { json } = require('body-parser');

// //引入总路由
const allRouter = require('./routers/index');
//实例化对象
let app = express();

// // 添加json解析
app.use(bodyParser.json());//帮我们解析post提交的数据 {"name","gaoyuanyuan","psw":123456}
app.use(bodyParser.urlencoded({ extended: false })); //帮我们解析post提交的键值对数据 name=gaoyuanyuan&psw=123456

app.use(allRouter);//使用总路由

//开启一个静态资源服务器:借助express的一个中间件 static
app.use(express.static('./'));//相当于apache里面的www默认的静态资源目录


//开启服务器:执行这个文件就是开启服务器了  node 06 server.js
//端口号设置：1000-60000
app.listen(8020, () => {
    //当服务器开启成功就执行这个回调函数
    console.log('服务器开启成功，请访问8020端口');
});
