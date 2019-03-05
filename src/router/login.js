const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
// (async()=>{
//     let datas = await db.find('user',{username:'admin'});
//     console.log('datas:',datas);
// })()


let Router = express.Router();

//登录
Router.post('/', bodyParser.urlencoded({ extended: false }), async (req, res) => {
    let { username, password } = req.body;
    let data = await db.find('user', { username, password });
    // console.log('data:',data);
    data = data[0];
    // console.log('data:',data);
    if (data) {
        res.send({
            _id: data._id,
            username: data.username,
        });
    } else {
        res.send({
            code: 100,
            msg: 'fail'
        });  
    }

})




module.exports = Router