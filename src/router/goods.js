const express = require('express');
const db = require('./db');
const db2 = require('./db/zsgc');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

let Router = express.Router();


//渲染页面
Router.get('/', async (req, res) => {

    let data;
    let gid = req.query.gid ? { 'gid': ObjectId(req.query.gid) } : {};
    // console.log('gid:',gid);
    try {
        data = await db2.find('goodlist', req.query, gid);
    } catch (err) {
        data = err;
    }
    res.send(data);

})

Router.get('/:goodcrud', async (req, res) => {
    let goodcrud = req.params.goodcrud;
    // console.log('goodcrud:', goodcrud);
    // 添加商品
    if (goodcrud == 'add') {
        let {
            goodname, oldprice, newprice, category, kucun, addtime
        } = req.query;

        let data;
        try {
            data = await db.insert('goodlist', { goodname, oldprice, newprice, category, kucun, addtime })
        } catch (err) {
            res.send(err);
        }
        res.send(data);
    }
    // 删除商品
    if (goodcrud == 'del') {
        let {
            addtime
        } = req.query;

        // console.log('gid:',req.query.gid);
        let data;
        try {
            data = await db.delete('goodlist', { addtime });
        } catch (err) {
            res.send(err);
        }
        res.send(data);
    }
    //修改商品名称
    if (goodcrud == 'change') {
        let {
            addtime, goodname
        } = req.query;
        // console.log(gid,goodname);
        let data;
        try {
            data = await db.update('goodlist', { addtime }, { $set: { goodname } })
        } catch (err) {
            res.send(err);
        }
        res.send(data);
    }

  
    // 删除多个商品
    if (goodcrud == 'delmore') {
        let {
            addtime
        } = req.query;


        arr = addtime.split(',');
        console.log('arr:', arr)
        let newArr = [];
        for (var i = 0; i < arr.length; i++) {
            let obj = {};
            obj.addtime = arr[i];
            newArr.push(obj);
        }


        let data;
        try {

            data = await db.delete('goodlist',{'$or':newArr});
            
        } catch (err) {
            res.send(err);
        }
        res.send(data);
    }
})

module.exports = Router;