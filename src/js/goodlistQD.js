document.addEventListener('DOMContentLoaded', () => {
    layui.use('table', function () {
        var table = layui.table;
        var $ = layui.jquery;
        //edit: 'text'为开启单元格编辑，sort:true开启排序
        table.render({
            elem: '#test',
            url: '/goodlist',
            toolbar: '#toolbarDemo',
            parseData: function (res) { //res 即为原始返回的数据
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.count, //解析数据长度
                    "data": res.data //解析数据列表
                };
            },
            cols: [
                [{
                    type: 'checkbox',
                    width: 100,
                    fixed: 'left'
                }, {
                    field: 'gid',
                    title: '商品id',
                    width: 100,
                    fixed: 'left',
                    unresize: true
                }, {
                    field: 'goodname',
                    title: '商品名称',
                    width: 400,
                }, {
                    field: 'category',
                    title: '分类',
                    width: 120,
                    sort: true
                }, {
                    field: 'oldprice',
                    title: '价格(原价)',
                    width: 120,
                    sort: true
                }, {
                    field: 'newprice',
                    title: '价格(现价)',
                    width: 120,
                    sort: true
                }, {
                    field: 'kucun',
                    title: '库存',
                    width: 100
                }, {
                    field: 'addtime',
                    title: '添加时间',
                    width: 120,
                    sort: true
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
            // console.log(data);
            if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    $.ajax({
                        type: "get",
                        url: "/goodlist/del",
                        data: "addtime=" + data.addtime,
                        success: function (data) {
                            console.log(data);
                            var message = data.ok;
                            var code = data.n;
                            if (data.n === 1) {
                                obj.del();
                                layer.close(index);
                                layer.alert(message, { icon: 1, time: 2000 });
                                table.reload('test', {
                                    url: '/goodlist',
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
                    , title: '修改商品名称'
                    , value: data.goodname
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
                url: "/goodlist/change",
                type: "get",
                data: { "addtime": data.addtime, "goodname": value },
                success: function (data) {
                    console.log(data);
                    if (data.n === 1) {
                        layer.close(index);
                        //同步更新表格和缓存对应的值
                        obj.update({
                            goodname: value
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
                console.log(typeof (codeId));
                parent.layer.msg('删除中...', { icon: 16, shade: 0.3, time: 5000 });
                layer.confirm("您确定要删除吗？" + codeId, function () {
                    $.ajax({
                        type: "get",
                        url: '/goodlist/delmore',
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
    var addgoodbtn = document.querySelector('.addgoodbtn');
    addgoodbtn.onclick = function () {
        location.href = "goodadd.html";
    }

})