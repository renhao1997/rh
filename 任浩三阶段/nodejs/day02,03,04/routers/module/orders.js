//引入插件
const express = require('express');
const Router = express.Router();

//引入MYSQL
let query = require('../../db/mysql')

//新增订单(购物车新增商品)
Router.post('/reg', async (req, res) => {
    try {
        //解构
        let { name, ade, price } = req.body //解构



        let sql = `INSERT INTO orderh (name, ade, price) VALUES ('${name}','${ade}','${price}')`
        console.log(sql);
        let data = await query(sql);
        console.log(data);
        let inf = {};
        if (data.affectedRows) {
            //注册成功
            inf = {
                code: 2000,
                flag: true,
                message: '注册成功'
            }
        } else {
            //注册失败
            inf = {
                code: 3000,
                flag: false,
                message: '注册失败'
            }
        }
        res.send(inf);//响应
    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: err.sqlState,
            flag: false,
            message: '注册失败'
        }
        res.send(inf);

    }

});

//删除订单(购物车删除商品)

Router.delete('/delete', async (req, res) => {

    try {
        let { id } = req.body;
        let sql = `DELETE FROM orderh WHERE id in(${id})`;
        let data = await query(sql);//[{}] await是用于等待成功返回的数据resolve()
        console.log(data);
        if (data.affectedRows) {
            //删除成功
            inf = {
                code: 2000,
                flag: true,
                message: '删除成功'

            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '删除失败'
            }
        }
        res.send(inf);

    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: 5000,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})

//修改订单
Router.put('/edit/:id', async (req, res) => {

    let { id } = req.params;
    console.log(id);
    let str = req.body;
    console.log(str);
    let sum = '';
    for (let key in str) {
        sum += key + '=' + `'${str[key]}'` + ','
    }
    sum = sum.slice(0, -1);//切掉最后一个,
    try {
        let sql = `UPDATE orderh SET ${sum} WHERE id =${id};`
        console.log(sql);
        let data = await query(sql);
        if (data.affectedRows) {
            //修改成功
            inf = {
                code: 2000,
                flag: true,
                message: '修改成功'

            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '修改失败'
            }
        }
        res.send(inf);
    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: 5000,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }



})

// 查询订单列表(购物车多商铺数据查询)
Router.get('/page', async (req, res) => {

    // console.log("111");

    let { page, allpage } = req.query;
    let index = (page - 1) * allpage;

    // console.log(page, allpage);
    try {
        let sql = `SELECT * FROM orderh LIMIT ${index},${allpage}`;
        console.log(sql);
        let data = await query(sql);
        console.log(data);
        let sql2 = `SELECT * FROM list`;
        let allArr = await query(sql2);//总条数
        if (data.length) {
            //查到数据
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                total: allArr.length,
                page,
                allpage,
                pages: Math.ceil(allArr.length / allpage),
                data


            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(inf);

    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: 5000,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});

//查询某个订单
Router.get('/getuser/:id', async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    try {
        let sql = `SELECT * FROM orderh WHERE id=${id}`;
        let data = await query(sql);
        if (data.length) {
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                data
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(inf);

    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: 5000,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});


// module.exports = Router;
module.exports = Router;//导出路由对象
