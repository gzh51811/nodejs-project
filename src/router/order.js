const express = require('express');
const db = require('./db');
const db2 = require('./db/zsgc');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

let Router = express.Router();

//渲染页面
Router.get('/',async (req,res)=>{
    let data;
    let gid = req.query.gid ? { 'gid': ObjectId(req.query.gid) } : {};
    // console.log('gid:',gid);
    try {
        data = await db2.find('orderlist', req.query, gid);
    } catch (err) {
        data = err;
    }
    res.send(data);
})

Router.get('/:ordercrud', async(req, res) => {
    let ordercrud = req.params.ordercrud;
    //删除单个订单行
    if(ordercrud == 'delone'){
        let{addtime}= req.query;
       
        let data;
        try {
            data = await db.delete('orderlist', { addtime });
        } catch (err) {
            res.send(err);
        }
        res.send(data);
    }
    // 删除多个商品
    if (ordercrud == 'delmore') {
        let {
            addtime
        } = req.query;
               
   
        arr = addtime.split(',');
        console.log('arr:',arr)
        let newArr=[];
        for(var i =0;i<arr.length;i++){
            let obj = {};
            obj.addtime = arr[i];
            newArr.push(obj);
        }
           
        let data; 
        try {
            data = await db.delete('orderlist',{'$or':newArr});
            // console.log('data:',data);
        } catch (err) {
            res.send(err);
        }
        res.send(data)
    }

})

module.exports = Router;