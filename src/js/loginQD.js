document.addEventListener('DOMContentLoaded', () => {
    let username = document.querySelector('.username');
    let password = document.querySelector('.password');
    let yanzhangma = document.querySelector('.yanzhangma');
    let btnlogin = document.querySelector('.btnlogin');
    let spaninf = document.querySelector('.biaodan_c .s1');
    let spaninf2 = document.querySelector('.biaodan_c .s3');
    let authcode = document.querySelector('.authcode');

    let isok = false;
    //3随机验证码
    function randomNum() {
        num = '';
        var str = '0123456789zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP';//
        //生成随机四位数有字母的验证码
        for (var i = 0; i < 4; i++) {
            num += str.charAt(parseInt(Math.random() * str.length));
        }
        return num;
    }
    function update() {
        var color = randomColor(16);
        //生成随机颜色四位数有字母的验证码
        authcode.style.color = color;
    }
    update();
    authcode.innerText = randomNum();
    authcode.onclick = () => {
        var val = authcode.innerText;
        authcode.innerText = randomNum();
        update();
    }

    //失去焦点验证验证码
    yanzhangma.onblur = () => {
        var val1 = yanzhangma.value.trim();
        var val2 = authcode.innerText;
        if (val1) {
            if (val1 == val2) {
                spaninf2.innerHTML = '验证码正确';
                spaninf2.style.color = 'green';
                isok = true;
            } else {
                spaninf2.innerHTML = '验证码错误';
                spaninf2.style.color = 'red';
            }
        } else {
            spaninf2.innerHTML = '不能为空';
            spaninf2.style.color = 'red';
        }
    }

    let status = [200, 304];
    btnlogin.onclick = () => {
        let _username = username.value;
        let _password = password.value;
        if (_username && _password) {
            if (isok) {
                let xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    if (status.includes(xhr.status)) {
                        let res = JSON.parse(xhr.responseText);
                        console.log(res);
                        if (res._id) {
                            Cookie.set('username', _username, { 'expires': now, "path": "/" });
                            location.href = '../index.html';
                        } else {
                            spaninf.innerHTML = '输入的账号或者密码不正确';
                            spaninf.style.color = 'red';
                        }
                    }
                }
                xhr.open('post', '/login', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                let data = `username=${_username}&password=${_password}`;
                xhr.send(data);
            } else {
                spaninf2.innerHTML = '验证码错误';
                spaninf2.style.color = 'red';
            }
        } else {
            alert('账号密码不能为空');
        }
    }

});