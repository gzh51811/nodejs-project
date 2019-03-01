const express = require('express');

//创建路由
let Router = express.Router();

// 引入路由模块
const loginRouter = require('./login');
// const userRouter = require('./user');
// const goodsRouter = require('./goods');
// const categoryRouter = require('./category');
// const orderRouter = require('./order');

//解决跨域问题
Router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});

//关于登录的路由
Router.use('/login',loginRouter);

// //关于用户的路由
// Router.use('/user',userRouter);

// // 关于商品的路由
// Router.use('/goods',goodsRouter);

// // 关于商品分类的路由
// Router.use('/category',categoryRouter);

// //关于订单管理的路由
// Router.use('/order',orderRouter);

//路由暴露
module.exports = Router;