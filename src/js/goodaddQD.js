document.addEventListener('DOMContentLoaded', () => {
    //JavaScript代码区域
    layui.use('element', function () {
        var element = layui.element;
    });
    //改成对应名字
    var addname = document.querySelector('.addname');
    var username = Cookie.get('username');//获取cookies
    addname.innerHTML = username;

    //点击确认添加商品到后台
    //1、获取节点
    var mingcheng = document.querySelector('.mingcheng');
    var yuanjia = document.querySelector('.yuanjia');
    var shoujia = document.querySelector('.shoujia');
    var fenlei = document.querySelector('.fenlei');
    var goodnum = document.querySelector('.goodnum');
    var tijiao = document.querySelector('.tijiao');

    //2.点击提交把商品信息提交到数据库
    tijiao.onclick = function () {
        var goodname = mingcheng.value;
        var oldprice = yuanjia.value * 1;
        var newprice = shoujia.value * 1;
        var category = fenlei.value;
        var kucun = goodnum.value * 1;

        var url = '/goodlist/add';
        var data = `goodname=${goodname}&oldprice=${oldprice}&newprice=${newprice}&category=${category}&kucun=${kucun}&addtime=${Date.parse(new Date())}`;
        ajax('GET', url, data, function (str) {
            // console.log(str);//获取后台返回信息,字符串
            var res = JSON.parse(str);//转成数组
            if (res.n == 1) {
                alert('商品添加成功');
            } else {
                alert('商品添加失败');
            }
            //每次添加商品完就清空名字和密码信息。
            mingcheng.value = '';
            yuanjia.value = '';
            shoujia.value = '';
            fenlei.value = '';
            goodnum.value = '';
        });
    }
})