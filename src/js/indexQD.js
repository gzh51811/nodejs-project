document.addEventListener('DOMContentLoaded',()=>{
  layui.use('element', function () {
    var element = layui.element;

  });
  //获取登录名
  var addname = document.querySelector('.addname');
 
  var user = Cookie.get('username');//获取cookies
   
    addname.innerHTML = user;

   //每次点击都传cookies到下个页面
   var addcookie = document.querySelector('.addcookie');
   addcookie.onclick = function () {
       Cookie.set('username', username, { path: "/" });
   }
})