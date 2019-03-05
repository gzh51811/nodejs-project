document.addEventListener('DOMContentLoaded', () => {
    layui.use('table', function () {
        var table = layui.table;
        var $ = layui.jquery;
        table.render({
            elem: '#test',
            url: '/userlist',
            toolbar: '#toolbarDemo',
            cols: [
                [{
                    type: 'checkbox',
                    width: 100
                }, {
                    field: 'gid',
                    title: '用户id',
                    width: 100,
                    unresize: true
                }, {
                    field: 'username',
                    title: '姓名',
                    width: 120,
                }, {
                    field: 'gender',
                    title: '性别',
                    width: 120,
                }, {
                    field: 'city',
                    title: '城市',
                    width: 120
                }, {
                    field: 'signature',
                    title: '签名'
                }, {
                    field: 'job',
                    title: '职业',
                    width: 100
                }, {
                    field: 'grade',
                    title: '积分',
                    width: 120,
                    sort: true
                }, {
                    field: 'regtime',
                    title: '注册时间',
                    width: 100
                }, {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#barDemo',
                    width: 120
                }]
            ],
            page: true
        });

        //监听行工具事件
        table.on('tool(test)', function (obj) {
            var data = obj.data;
            //console.log(data);
            if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    $.ajax({
                        type: "get",
                        url: "/userlist/del",
                        data: "regtime=" + data.regtime,
                        success: function (data) {
                            console.log(data)
                            var message = data.ok;
                            var code = data.n;
                            if (code === 1) {
                                obj.del();
                                layer.close(index);
                                layer.alert(message, { icon: 1, time: 2000 });
                                table.reload('test', {
                                    url: '/userlist',
                                    where: {}
                                });
                            } else {
                                layer.alert(message, {
                                    icon: 2, title: '提示'
                                });
                                return;
                            }
                        },
                        error: function () {
                        }
                    })
                });
            } else if (obj.event === 'edit') {
                layer.prompt({
                    formType: 2
                    , title: '修改用户名字'
                    , value: data.username
                }, function (value, index) {
                    // obj.update({
                    // 	goodname: value
                    // });
                    EidtUv(data, value, index, obj);
                });
            }
        });
        //修改函数
        function EidtUv(data, value, index, obj) {
            $.ajax({
                url: "/userlist/change",
                type: "get",
                data: { "regtime": data.regtime, "username": value },
                success: function (data) {
                    if (data.n === 1) {
                        layer.close(index);
                        //同步更新表格和缓存对应的值
                        obj.update({
                            username: value
                        });
                        layer.msg("修改成功", { icon: 6 });
                    } else {
                        layer.msg("修改失败", { icon: 5 });
                    }
                }
            });
        }
        //删除多行
        var $ = layui.$, active = {
            getCheckData: function () {
                var checkStatus = table.checkStatus('test');// table.checkStatus是Layui中自带，id: 'table的id
                if (checkStatus.data.length == 0) {
                    parent.layer.msg('请先选择要删除的数据行！', { icon: 2 });
                    return;
                }
                var codeId = '';
                for (var i = 0; i < checkStatus.data.length; i++) {
                    codeId += checkStatus.data[i]._id + ",";
                }
                parent.layer.msg('删除中...', { icon: 16, shade: 0.3, time: 5000 });
                layer.confirm("您确定要删除吗？" + codeId, function () {
                    $.ajax({
                        type: "get",
                        url: '/userlist/delmore',
                        data: { "_id": codeId },
                        success: function (data) {
                            layer.closeAll('loading');
                            if (data.n === 1) {
                                parent.layer.msg('删除成功！', { icon: 1 });
                                location.reload(true);
                            } else {
                                parent.layer.msg('删除失败！', { icon: 2 });
                            }
                        }
                    })
                })
            }
        };
        //通用按钮
        $('.layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

    });
    //JavaScript代码区域
    layui.use('element', function () {
        var element = layui.element;

    });
    //改成对应名字
    var addname = document.querySelector('.addname');
    var username = Cookie.get('username');//获取cookies
    addname.innerHTML = username;

    //点击添加商品按钮
    var addgoodbtn = document.querySelector('.addgoodbtn');
    addgoodbtn.onclick = function () {
        location.href = "useradd.html";
    }
})