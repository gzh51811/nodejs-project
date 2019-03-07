
## 项目名称
* 后台管理系统

### 上线公网IP地址
    * 39.96.59.27:1811

###  登录账户密码
    *账户：admin
    *密码：123456

## 人员结构
* 组长：谢建满
* 组员：谢建满、谢雁浩

### 技术栈
* nodejs + express + mongoDB + jQuery + ES6 + layui + bootstrap

### 项目分工
* 谢建满
    *后台路由
        *商品列表路由：编辑，删除，添加，多项删除，数据交互
        *商品分类路由：删除，添加，批量删除，数据交互
        *inde.js:路由连接，express服务器
        *登录路由：前端传来的数据验证，查询数据库
        *订单路由：编辑，删除，添加，多项删除功能实现，数据交互
        *人员管理路由：删除，批量删除，数据交互
    
* 谢雁浩
    *前端布局
        *前端页面的实现（layui）
        *html，css页面布局
        *mongodb假数据制作



|-- undefined
    |-- .gitignore
    |-- package-lock.json
    |-- package.json
    |-- 成员表.txt
    |-- doc
    |   |-- goodlist.json   商品列表数据
    |   |-- goodsort.json   商品分类数据
    |   |-- orderlist.json  订单列表数据
    |   |-- user.json       用户登录数据
    |   |-- userlist.json   用户列表数据
    |-- src
        |-- config.json
        |-- index.html
        |-- server.js
        |-- assets
        |   |-- common.js
        |   |-- jquery-3.3.1.min.js
        |   |-- layui
        |       |-- layui.all.js
        |       |-- layui.js
        |       |-- css
        |       |   |-- layui.css
        |       |   |-- layui.mobile.css
        |       |   |-- modules
        |       |       |-- code.css
        |       |       |-- laydate
        |       |       |   |-- default
        |       |       |       |-- laydate.css
        |       |       |-- layer
        |       |           |-- default
        |       |               |-- icon-ext.png
        |       |               |-- icon.png
        |       |               |-- layer.css
        |       |               |-- loading-0.gif
        |       |               |-- loading-1.gif
        |       |               |-- loading-2.gif
        |       |-- font
        |       |   |-- iconfont.eot
        |       |   |-- iconfont.svg
        |       |   |-- iconfont.ttf
        |       |   |-- iconfont.woff
        |       |
        |       |-- lay
        |           |-- modules
        |               |-- carousel.js
        |               |-- code.js
        |               |-- colorpicker.js
        |               |-- element.js
        |               |-- flow.js
        |               |-- form.js
        |               |-- jquery.js
        |               |-- laydate.js
        |               |-- layedit.js
        |               |-- layer.js
        |               |-- laypage.js
        |               |-- laytpl.js
        |               |-- mobile.js
        |               |-- rate.js
        |               |-- slider.js
        |               |-- table.js
        |               |-- tree.js
        |               |-- upload.js
        |               |-- util.js
        |-- css
        |   |-- base.css
        |   |-- goodadd.css
        |   |-- goodlist.css
        |   |-- goodsort.css
        |   |-- index.css
        |   |-- login.css
        |   |-- orderlist.css
        |   |-- sortadd.css
        |   |-- useradd.css
        |   |-- userlist.css
        |-- html
        |   |-- goodadd.html    商品添加
        |   |-- goodlist.html   商品列表
        |   |-- goodsort.html   商品分类
        |   |-- login.html      用户登录
        |   |-- orderlist.html  订单列表
        |   |-- sortadd.html    分类添加
        |   |-- useradd.html    用户添加
        |   |-- userlist.html   用户列表
        |-- img 
        |   |-- tp_01.png
        |   |-- tp_02.png
        |   |-- tp_03.png
        |   |-- tp_04.png
        |-- js
        |   |-- goodaddQD.js    商品添加前端js文件
        |   |-- goodlistQD.js   商品列表前端js文件
        |   |-- goodsortQD.js   商品分类前端js文件
        |   |-- loginQD.js      用户登录前端js文件
        |   |-- orderlistQD.js  订单列表前端js文件
        |   |-- sortaddQD.js    分类添加前端js文件
        |   |-- useraddQD.js    用户添加前端js文件  
        |   |-- userlistQD.js   用户列表前端js文件
        |-- router 路由
            |-- category.js 商品分类路由 
            |-- goods.js 商品列表路由
            |-- index.js 
            |-- login.js 登录路由
            |-- order.js 订单管理路由
            |-- upload.js 文件上传路由
            |-- user.js 用户管理路由
            |-- db  mongoDB的封装
                |-- index.js 
                |-- zsgc.js
