//子路由

//引入插件
const express = require('express');
const Router = express.Router();


//引入queer查询数据库

const query = require('../../db/mysql');
const tokenFn = require('./token')



//////////查询用户是否存在////////////    get请求

Router.get('/checkname', async (req, res) => {

    try {

        let { name } = req.query;//解构传过来的数据
        let sql = `SELECT * FROM data WHERE name = '${name}'`//查询服务器语句


        let data = await query(sql);//查询数据是否存在于服务器

        // console.log(data);
        if (data.length) {
            inf = {
                code: 3000,
                falag: false,
                messge: "用户名存在"
            }
            console.log(inf);
        } else {
            inf = {
                code: 2000,
                flag: true,
                message: '用户名不存在'
            }
        }

        res.send(inf)
    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: err.sqlState,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }

})

/////////注册功能////////////////// post请求

Router.post('/reg', async (req, res) => {
    try {
        //解构
        let { name, psd } = req.body //解构

        let sql = `SELECT * FROM data WHERE name = '${name}'`
        let data = await query(sql);

        if (data.length) {
            inf = {
                code: 3000,
                falag: false,
                messge: "用户名存在"
            }


        } else {

            let sql = `INSERT INTO data(name,psd) VALUES('${name}','${psd}')`
            let reg = await query(sql);
            // console.log(reg);

            if (reg.affectedRows) {
                //注册成功
                inf = {
                    code: 2000,
                    flag: true,
                    message: '注册成功'
                }
            }
        }
        res.send(inf)
    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: err.sqlState,
            flag: false,
            message: '注册失败'
        }
        res.send(inf);

    }

})

//////////登录功能//////////////////// post请求

Router.get('/login', async (req, res) => {
    try {

        let { name, psd } = req.query;
        let sql = `SELECT * FROM data WHERE name='${name}' AND psd='${psd}'`
        let token = tokenFn.create(psd);
        let data = await query(sql);
        // console.log(data);
        console.log(token);

        if (data.length) {
            //登陆成功
            inf = {
                code: 2000,
                flag: true,
                message: '登陆成功',
                token
            }
        } else {
            //登陆失败
            inf = {
                code: 3000,
                flag: false,
                message: '登陆失败'
            }
        }
        res.send(inf);//响应

        // console.log(data);
    } catch (err) {
        inf = {
            code: err.sqlState,
            flag: false,
            message: '查询失败'
        }
    }
})

//////////查询id功能（动态路由）//////////////////// 
Router.get('/getuser/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let sql = `SELECT * FROM data WHERE uid=${id}`;
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

///////////校验token:get请求//////////
Router.get('/verify', async (req, res) => {

    try {
        let { token } = req.query;//解构

        let res = tokenFn.verify(token);
        console.log(res);
        if (res) {
            //校验通过:就允许进入购物车、个人中心
            inf = {
                code: 2000,
                flag: true,
                message: '校验通过'
            }
        } else {
            //校验失败:跳回登陆页:被改了，或过期了
            inf = {
                code: 3000,
                flag: false,
                message: '校验失败'
            }
        }

    } catch (err) {
        inf = {
            code: 5000,
            flag: false,
            message: '校验失败' //失败：调用verify接口出错
        }
    }
    res.send(inf);//响应
})

//////////修改信息（动态路由）//////////////////// 
Router.put('/edit/:id', async (req, res) => {
    let { id } = req.params;
    let str = req.body;
    let sum = '';
    for (let key in str) {
        sum += key + '=' + `'${str[key]}'` + ','
    }
    sum = sum.slice(0, -1);//切掉最后一个,

    try {
        let sql = `UPDATE data SET ${sum} WHERE uid =${id};`
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

//////////删除一条用户（动态路由）////////
Router.delete('/delete/:id', async (req, res) => {

    try {
        let { id } = req.params;
        // let sql = `DELETE FROM data WHERE uid=${id}`
        let sql = `DELETE FROM data WHERE uid=${id}`;

        let data = await query(sql);

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

//////////删除多条用户（////////
Router.delete('/alldelete', async (req, res) => {

    try {
        let { id } = req.body;
        let sql = `DELETE FROM data WHERE uid in(${id})`;
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

//////////查询分页功能（////////
Router.get('/page', async (req, res) => {
    let { page, allpage } = req.query;
    let index = (page - 1) * allpage;


    try {
        let sql = `SELECT * FROM data LIMIT ${index},${allpage}`;
        let data = await query(sql);
        // console.log(data);
        let sql2 = `SELECT * FROM data`;
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




module.exports = Router;//导出路由对象