document.addEventListener('DOMContentLoaded', () => {
    //JavaScript代码区域
    layui.use('element', function () {
        var element = layui.element;

    });
    //改成对应名字
    var addname = document.querySelector('.addname');
    var username = Cookie.get('username');//获取cookies
    addname.innerHTML = username;

    //点击提交用户信息到后台数据库
    //1.获取节点
    var xingming = document.querySelector('.xingming')
    var mima1 = document.querySelector('.mima1')
    var mima2 = document.querySelector('.mima2')
    var chengshi = document.querySelector('.chengshi')
    var xingbie = document.querySelector('.xingbie')
    var zhiye = document.querySelector('.zhiye')
    var jifen = document.querySelector('.jifen')
    var qianming = document.querySelector('.qianming')
    var tijiao = document.querySelector('.tijiao')

    //点击提交
    tijiao.onclick = function () {
        var username = xingming.value;
        var password = mima1.value * 1;
        var psw = mima2.value * 1;
        var city = chengshi.value;
        var gender = xingbie.value;
        var job = zhiye.value;
        var grade = jifen.value * 1;
        var signature = qianming.value;

        if (psw == password) {
            var url = '/userlist/add';
            var data = `username=${username}&password=${password}&city=${city}&gender=${gender}&job=${job}&grade=${grade}&signature=${signature}&regtime=${Date.parse(new Date())}`;
            ajax('GET', url, data, function (str) {
                //console.log(str);//获取后台返回信息,字符串
                var res = JSON.parse(str);//转成数组
                console.log(res);
                if (res.n == 1) {
                    alert('用户添加成功');
                } else {
                    alert('用户添加失败');
                }
                //每次添加商品完就清空名字和密码信息。
                xingming.value = '';
                mima2.value = '';
                mima1.value = '';
                chengshi.value = '';
                xingbie.value = '';
                zhiye.value = '';
                jifen.value = '';
                qianming.value = '';
            });
        } else {
            alert('您输入的密码两次不相同');
        }
    }
})