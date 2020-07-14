//引入express模块:先安装express: npm i express

// let express = require('express');//绝对路径
let express= require('express');

let app=express();

// app.use(express.static('./'));


app.use(express.static('./'))

app.listen(8000,()=>{
    console.log('服务器开启成功，请访问8000端口');
});