//希望在这里查询数据，返回给前端，叫做路由

const express = require('express');
// const Router = express.Router();
const Router = express.Router();

//引入子路由

const userRouter = require('./module/user')
const listRouter = require('./module/goods')
const ordersRouter = require('./module/orders')

//子路由的选择
Router.use('/user', userRouter);
Router.use('/goods', listRouter);
Router.use('/orders', ordersRouter)


module.exports = Router;//导出路由对象
