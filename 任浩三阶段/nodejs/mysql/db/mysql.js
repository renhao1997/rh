//引入MySQL模块
const mysql = require("mysql");
const { resolve } = require("path");
const { rejects } = require("assert");

//创建连接池

let pool = mysql.createPool({

    host: "localhost",//主机名
    user: "root",
    password: "",
    port: 3306,
    database: "h52002",
    multipleStatements: true

})

//封装查询mysql导出模块 

function query(sql) {
    return new Promise((resolve, rejects) => {
        pool.query(sql, (err, data) => {
            if (err) rejects(err); //错误调用失败的回调
            resolve(data) //成功的回调
        });
    });

}

module.exports = query; //导出模块