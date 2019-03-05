document.addEventListener('DOMContentLoaded', () => {
    layui.use('table', function () {
        var table = layui.table;
        var $ = layui.jquery;
        table.render({
            elem: '#test',
            url: '/category',
            toolbar: '#toolbarDemo',
            cols: [
                [{
                    type: 'checkbox',
                    width: 200
                }, {
                    field: 'gid',
                    title: '种类序号',
                    width: 200,
                    unresize: true
                }, {
                    field: 'category',
                    title: '商品种类',
                    edit: 'text'
                }, {
                    field: 'addtime',
                    title: '添加时间',
                    width: 400,
                    unresize: true
                }, {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#barDemo',
                    width: 220
                }]
            ],
            page: true
        });

        //监听行工具事件
        table.on('tool(test)', function (obj) {
            var data = obj.data;
            console.log(data);
            if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    $.ajax({
                        type: "get",
                        url: "/category/delone",
                        data: "addtime=" + data.addtime,
                        success: function (data) {
                            // console.log(data);
                            var message = data.ok;
                            var code = data.n;
                            if (data.n === 1) {
                                obj.del();
                                layer.close(index);
                                layer.alert(message, { icon: 1, time: 2000 });
                                table.reload('test', {
                                    url: '/category',
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
            }
        });
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
                        url: '/category/delmore',
                        data: { "_id": codeId },
                        success: function (data) {
                            console.log(data);
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
    var addgoodbtn = document.querySelector('#addgoodbtn');
    addgoodbtn.onclick = function () {
        location.href = "sortadd.html";
    }
})