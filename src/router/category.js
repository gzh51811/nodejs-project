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
        data = await db2.find('goodsort', req.query, gid);
    } catch (err) {
        data = err;
    }
    res.send(data);
})

Router.get('/:sortcrud', async (req, res) => {
    let sortcrud = req.params.sortcrud;
    //插入种类
    if (sortcrud == 'add') {
        let {
            category, addtime, message
        } = req.query;
        // console.log(category, addtime, message);

        let data;
        try {
            data = await db.insert('goodsort',{category, addtime, message})
        } catch (err) {
            res.send(err);
        }
        res.send(data);
    }
    //删除种类单行
    if (sortcrud == 'delone') {
        let {
            addtime
        } = req.query;
        console.log('addtime:', addtime);


        let data;
        try {
            data = await db.delete('goodsort', { addtime });
        } catch (err) {
            res.send(err);
        }
        res.send(data);
    }
    // 删除多个商品
    if (sortcrud == 'delmore') {
        let {
            _id
        } = req.query;
        
        gid = _id.substring(0, _id.length - 1);
       
    //    console.log('gid:',_id);
        let data;
        try {
            data = await db.delete('goodlist',{"_id" : ObjectId(gid)});
        } catch (err) {
            res.send(err);
        }
        res.send(data);
    }
})




module.exports = Router;