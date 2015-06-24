Ext.define('AM.store.Channels', {
    extend: 'Ext.data.Store',

    //fields: ['pkId','name', 'code'],
    //data: [
    //    {pkId:1,name: 'Ed',    code: 'ed@sencha.com'},
    //    {pkId:2,name: 'Tommy', code: 'tommy@sencha.com'}
    //],
    storeId: 'channelsid',
    total: 1,
    autoLoad: true,
    autoSync: true,
    remoteFilter:true,

    model: 'AM.model.Channel',
    proxy: {
        type: 'rest',
        url: '/channel_auth',
        limitParam: 'size',
        reader: {
            type: 'json',
            totalProperty: 'PAGE.totalElements',
            root: 'DATA'
        },
        writer: {
            type: 'json'
        },


        processResponse: function (success, operation, request, response, callback, scope) {
            //自定义--begin


            console.log("process response:......" + response);
            console.log("process request:......" + request);
            console.log("process success:......" + success);


            var mystrjson = response.responseText;
            var mystrjson2;

            //对后端返回的json 进行标准化处理和封装；
            if (request.action == 'read') {

                var myobjson = Ext.decode(mystrjson);//将json字符串转换为对象
                var myobjson2 = Ext.decode("{}");

                if (Ext.isEmpty(myobjson._embedded)) {
                    myobjson2["DATA"] = {};

                } else {
                    myobjson2["DATA"] = myobjson._embedded.channel_auth;
                }

                myobjson2["PAGE"] = myobjson.page;


            }
            else if (request.action == 'create') {
                AM.store.Channels.total = AM.store.Channels.total + 1;
                var page = {
                    "page": {
                        "totalElements": AM.store.Channels.total
                    }
                };

                var myobjson2 = Ext.decode("{}");
                var myobjson = Ext.decode(mystrjson);//将json字符串转换为对象
                myobjson2["DATA"] = myobjson;
                myobjson2["PAGE"] = page;


            }

            else if (request.action == 'update') {
                var page = {
                    "page": {
                        "totalElements": AM.store.Channels.total
                    }
                };

                var myobjson2 = Ext.decode("{}");
                var myobjson = Ext.decode(mystrjson);//将json字符串转换为对象
                myobjson2["DATA"] = myobjson;
                myobjson2["PAGE"] = page;

            }

            else if (request.action == 'destroy') {
                AM.store.Channels.total = AM.store.Channels.total - 1;
                var page = {
                    "page": {
                        "totalElements": AM.store.Channels.total
                    }
                };
                var myobjson2 = Ext.decode("{}");
                myobjson2["PAGE"] = page;
            }

            mystrjson2 = Ext.encode(myobjson2);//将json对象转换为json字符串 其中Mystrjson=Mystrjson2
            console.info("result response:......" + mystrjson2);//使用json对象属性

            response.responseText = mystrjson2;


            //自定义--end

            var me = this,
                reader,
                result;

            if (success === true) {
                reader = me.getReader();

                // Apply defaults to incoming data only for read operations.
                // For create and update, there will already be a client-side record
                // to match with which will contain any defaulted in values.
                reader.applyDefaults = operation.action === 'read';

                result = reader.read(me.extractResponseData(response));


                if (result.success !== false) {
                    //see comment in buildRequest for why we include the response object here
                    Ext.apply(operation, {
                        response: response,
                        resultSet: result
                    });

                    operation.commitRecords(result.records);
                    operation.setCompleted();
                    operation.setSuccessful();
                } else {
                    operation.setException(result.message);
                    me.fireEvent('exception', this, response, operation);
                }
            } else {
                me.setException(operation, response);
                me.fireEvent('exception', this, response, operation);
            }

            //this callback is the one that was passed to the 'read' or 'write' function above
            if (typeof callback == 'function') {
                callback.call(scope || me, operation);
            }

            me.afterRequest(request, success);
        },

        //doRequest: function (operation, callback, scope) {
        //
        //    var writer = this.getWriter(),
        //        request = this.buildRequest(operation);
        //    if (operation.allowWrite()) {
        //        request = writer.write(request);
        //    }
        //
        //    console.log("do request:......" + operation);
        //
        //
        //    Ext.apply(request, {
        //        async: this.async,
        //        binary: this.binary,
        //        headers: this.headers,
        //        timeout: this.timeout,
        //        scope: this,
        //        callback: this.createRequestCallback(request, operation, callback, scope),
        //        method: this.getMethod(request),
        //        disableCaching: false
        //    });
        //
        //
        //    /*
        //     * do anything needed with the request object
        //     */
        //    //console.log('request', request);
        //    console.log('request.params', request.params);
        //
        //    Ext.Ajax.request(request);
        //    return request;
        //},

        afterRequest: function (request, success) {
            //var store=Ext.getStore("channelsid");
            //统一给用户修改提示信息
            console.log("after request:", request);


            var result = request.operation.success;

            if (request.action == 'read') {

                AM.store.Channels.total = request.operation.resultSet.total;
                console.log("记录总数:", AM.store.Channels.total);


                Ext.MessageBox.show({
                    msg: '正在查询数据,请稍后...',
                    progressText: 'Saving...',
                    width: 300,
                    wait: true,
                    waitConfig: {interval: 200},
                    icon: 'ext-mb-download', //custom class in msg-box.html
                    iconHeight: 50
                });
                setTimeout(function () {
                    //This simulates a long-running operation like a database save or XHR call.
                    //In real code, this would be in a callback function.
                    Ext.MessageBox.hide();
                }, 1000);
            }

            else if (request.action == 'create') {
                if (result) {
                    Ext.MessageBox.show({
                        msg: '正在保存数据,请稍后...',
                        progressText: 'Saving...',
                        width: 300,
                        wait: true,
                        waitConfig: {interval: 200},
                        icon: 'ext-mb-download', //custom class in msg-box.html
                        iconHeight: 50
                    });
                    setTimeout(function () {
                        //This simulates a long-running operation like a database save or XHR call.
                        //In real code, this would be in a callback function.
                        Ext.MessageBox.hide();
                    }, 1000);

                    //Ext.Msg.alert('添加提示', '添加成功！');
                    //store.reload();
                } else {
                    Ext.Msg.alert('添加提示', '添加失败！');
                }
            }

            else if (request.action == 'update') {
                if (result) {
                    Ext.MessageBox.show({
                        msg: '正在保存数据,请稍后...',
                        progressText: 'Saving...',
                        width: 300,
                        wait: true,
                        waitConfig: {interval: 200},
                        icon: 'ext-mb-download', //custom class in msg-box.html
                        iconHeight: 50
                    });
                    setTimeout(function () {
                        //This simulates a long-running operation like a database save or XHR call.
                        //In real code, this would be in a callback function.
                        Ext.MessageBox.hide();
                    }, 1000);
                    //Ext.Msg.alert('提示', '更新成功！');
                    //store.reload();
                }
                else {
                    Ext.Msg.alert('提示', '更新失败！');
                }
            }

            else if (request.action == 'destroy') {
                if (result) {
                    Ext.MessageBox.show({
                        msg: '正在删除数据,请稍后...',
                        progressText: 'Saving...',
                        width: 300,
                        wait: true,
                        waitConfig: {interval: 200},
                        icon: 'ext-mb-download', //custom class in msg-box.html
                        iconHeight: 50
                    });
                    setTimeout(function () {
                        //This simulates a long-running operation like a database save or XHR call.
                        //In real code, this would be in a callback function.
                        Ext.MessageBox.hide();
                    }, 1000);
                    //Ext.Msg.alert('提示', '数据删除成功');
                    //store.reload();
                }
                else {
                    Ext.Msg.alert('提示', '数据删除失败');
                }
            }

        }

    },

    pageSize: 10,
    currentPage: 1,
    listeners: {
        metachange: function (store, meta) {
            console.log("Version " + meta.version + "Search query " + meta.searchQuery);
        },
        beforeload: function (store, operation, eOpts) {

            //store.proxy.jsonData = {"pagination" : {"page":operation.page,
            //    "limit":operation.limit,
            //    "sort":operation.sorters[0].property,
            //    "dir":operation.sorters[0].direction
            //},
            //    "basicInfo" : {"ccoId":remoteUser,
            //        "prefLang":"eng_US",
            //        "requestStartDate":(new Date()).format("isoDateTime"),
            //        "requesterApp":appName } };

        }

    }

    //
    //listeners: {
    //    write: function(store, operation){
    //        var record = operation.getRecords()[0],
    //            name = Ext.String.capitalize(operation.action),
    //            verb;
    //
    //
    //        if (name == 'Destroy') {
    //            record = operation.records[0];
    //            verb = 'Destroyed';
    //        } else {
    //            verb = name + 'd';
    //        }
    //        Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
    //
    //    }
    //}
});




