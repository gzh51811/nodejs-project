document.addEventListener('DOMContentLoaded', () => {
    //JavaScript代码区域
    layui.use('element', function () {
        var element = layui.element;

    });
    //改成对应名字
    var addname = document.querySelector('.addname');
    var username = Cookie.get('username');//获取cookies
    addname.innerHTML = username;

    //点击添加类别到后台
    //1、获取节点
    var fenlei = document.querySelector('.fenlei');
    var beizhu = document.querySelector('.beizhu');
    var tijiao = document.querySelector('.tijiao');

    //2、点击提交
    tijiao.onclick = function () {
        var category = fenlei.value;
        var message = beizhu.value;

        var url = '/category/add';
        var data = `category=${category}&message=${message}&addtime=${Date.parse(new Date())}`;

        ajax('GET', url, data, function (str) {
            console.log(str);
            var res = JSON.parse(str);
            var message = data.ok;
            if (res.n == 1) {
                alert('商品种类插入成功');
            } else {
                alert('商品种类插入不成功');
            }
            fenlei.value = '';
            beizhu.value = '';
        })
    }
})