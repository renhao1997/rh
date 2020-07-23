//安装multer模块，进行文件的上传  npm i multer -S
//引入multer模块
const multer = require('multer');
//引入express
const express = require('express');
const Router = express.Router();//Router==app

//引入MYSQL
let query = require('../../db/mysql')

//配置上传目录：文件名被改了；没有文件后缀；目录没有就自动创建
// var upload = multer({ dest: 'uploads/' });

var storage = multer.diskStorage({
    //配置上传目录：目录如果没有就上传失败
    // destination: function (req, file, cb) {
    //   cb(null, 'uploads/')
    // },
    //目录无则自动创建
    destination: 'uploads/',
    //文件名的控制
    filename: function (req, file, cb) {
        // console.log(file);
        let filename = file.originalname;//3.jpg
        let arr = filename.split('.');//[3,'jpg']
        // cb(null, file.fieldname + '-' + Date.now()) //默认：没有后缀 avatar-436364364563
        cb(null, arr[0] + '-' + Date.now() + '.' + arr[1]);//处理方案:3-5343535353.jpg
    }
})
var upload = multer({ storage: storage });//调用上面配置参数storage

Router.post('/headphoto', upload.single('avatar'), async (req, res) => {
    // console.log(req.file);//存储文件

    let url = 'http://localhost:8020/uploads/' + req.file.filename;
    let { uid } = req.body;
    // console.log(url, uid);
    let sql = `UPDATE data SET tel = '${url}' WHERE uid = ${uid}`;
    let data = await query(sql);

    // console.log(data.affectedRows);
    let inf = {};
    if (data.affectedRows) {
        //上传成功
        inf = {
            code: 2000,
            flag: true,
            message: '上传成功'
        }
    } else {
        inf = {
            code: 3000,
            flag: false,
            message: '上传失败'
        }
    }
    res.send(inf);
})
module.exports = Router;//导出路由对象