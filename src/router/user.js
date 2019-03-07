// 利用Express中的Router实现路由模块化
const express = require('express');
const db = require('./db');
const db2 = require('./db/zsgc');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

let Router = express.Router();

Router.get('/', async (req, res) => {
    let data;
    let gid = req.query.gid ? { 'gid': ObjectId(req.query.gid) } : {};
    // console.log('gid:',gid);
    try {
        data = await db2.find('userlist', req.query, gid);
    } catch (err) {
        data = err;
    }
    res.send(data);
})

Router.get('/:usercrud', async (req, res) => {
    let usercrud = req.params.usercrud;
    // 添加用户
    if (usercrud == 'add') {
        let {
            username, password, city, gender, job, grade,signature,regtime
        } = req.query;
        
        
        let data;
        try {
            data = await db.insert('userlist',{username, password, city, gender, job, grade,signature,regtime})
        } catch (err) {
            res.send(err);
        }
        res.send(data);
    }
    // 删除用户
    if (usercrud == 'del') {
        let {
            regtime
        } = req.query;
        // console.log('addtime:',regtime);
        let data;
        try {
            data = await db.delete('userlist', { regtime });
        } catch (err) {
            res.send(err);
        }
        res.send(data);
    }
    //修改用户名称
    if (usercrud == 'change') {
        let {
            regtime, username
        } = req.query;

        let data;
        try {
            data = await db.update('userlist', {regtime}, { $set: { username } })
        } catch (err) {
            res.send(err);
        }
        res.send(data);
    }
    // 删除多个用户
    if (usercrud == 'delmore') {
        
        let {
            regtime
        } = req.query;
       
        arr = regtime.split(',');
        // console.log('arr:',arr)
        let newArr=[];
        for(var i =0;i<arr.length;i++){
            let obj = {};
            obj.regtime = arr[i];
            newArr.push(obj);
        }
        
        let data;
        try {
            data = await db.delete('userlist',{'$or':newArr});
        } catch (err) {
            res.send(err);
        }
        res.send(data);
    }
})



module.exports = Router;