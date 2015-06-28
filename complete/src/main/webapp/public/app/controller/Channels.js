Ext.define('AM.controller.Channels', {
    extend: 'Ext.app.Controller',

    views: [
        'channel.List',
        'channel.Edit',
        'channel.Grid'

    ],
    stores: [
        'Channels',
        'MyOption'
    ],
    models: [
        'Channel'
    ]
    ,
    init: function () {
        this.control({
            'channelgrid': {
                render: this.loadChannelInfo
            },
            'channelgrid>toolbar button[action=add]': {
                click: this.addChannel
            },
            'channelgrid>toolbar button[action=del]': {
                click: this.delChannel
            },
            'channeledit button[action=save]': {
                click: this.updateChannelForm
            }
            ,
            'channelgrid>toolbar button[action=addform]': {
            click: this.addChannelForm
            }
            ,
            'channelgrid': {
                selectionchange: this.selectionChange
            }
        });
    },


    addChannelForm: function (btn) {

        //var store = btn.up('panel').down('gridpanel').getStore();

        var rec = Ext.create('AM.model.Channel', {
            name: '用户名',
            code: '编码',
            pwd: '秘钥',
            createDate: new Date(),
            updateDate: new Date()

        });

        console.log(rec);
        var view = Ext.widget('channeledit');
        view.down('form').loadRecord(rec);
    },

    loadChannelInfo: function (obj) {
        var store = obj.getStore();
        store.reload();
    },

    addChannel: function (btn) {

        var r = Ext.create('AM.model.Channel', {
            name: '用户名',
            code: '编码',
            pwd: '秘钥',
            createDate: new Date(),
            updateDate: new Date()
        });

        this.getChannelsStore().insert(0, r);

        var rowEditing = btn.up('gridpanel').editingPlugin;
        rowEditing.startEdit(0, 0);

        //var pagingtoolbar = btn.up('panel').down('pagingtoolbar').getStore();

        //store.reload();//fixme
        //console.log(store);
    },

    delChannel: function (btn) {
        var grid = btn.up('channelgrid');

        var store = grid.getStore();
        var sm = grid.getSelectionModel();
        var selectedRecord=sm.getSelection();
        console.info(selectedRecord[0]);

        Ext.MessageBox.confirm('提示', '确认('+selectedRecord[0].get('pkId')+")["+selectedRecord[0].get('name')+']要删除这条记录',
            callBack);

        function callBack(id) {
            if(id=='yes'){

                store.remove(selectedRecord);
                if (store.getCount() > 0) {
                    sm.select(0);
                };
            }
        }

    },

    updateChannelForm: function (btn) {
        //var store = btn.up('panel').down('gridpanel').getStore();
        //store.sync({
        //    callback: function (store) {
        //        Ext.Msg.alert('提示', store.proxy.reader.jsonData.msg);
        //    }
        //});

        var win    = btn.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        // synchronize the store after editing the record
        //record.save();
        this.getChannelsStore().add(record);

        this.getChannelsStore().reload();//会使数据的排序产生变动

    },
    //激活删除按钮
    selectionChange: function(selModel, selections){
        console.log("selection change......");
        var delBtn = Ext.ComponentQuery.query("channelgrid button[iconCls=del_btn]")[0];
        delBtn.setDisabled(selections.length === 0);
    }

    //init: function() {
    //    this.control({
    //        'viewport > channellist': {
    //            itemdblclick: this.editChannel
    //        },
    //        'channeledit button[action=save]': {
    //            click: this.updateChannel
    //        }
    //    });
    //},
    //
    //
    //editChannel: function(grid, record) {
    //    console.log('Double clicked on ' + record.get('name'));
    //    var view = Ext.widget('channeledit');
    //
    //    view.down('form').loadRecord(record);
    //},
    //
    ////updateUser: function(button) {
    ////    console.log('clicked the Save button');
    ////}
    //
    //updateChannel: function(button) {
    //
    //    var win    = button.up('window'),
    //        form   = win.down('form'),
    //        record = form.getRecord(),
    //        values = form.getValues();
    //
    //    record.set(values);
    //
    //    console.log('Save ' + record.get('pkId'));
    //    console.log('Save ' + record.get('name'));
    //
    //    win.close();
    //    // synchronize the store after editing the record
    //    //this.getChannelsStore().sync(); // 两次提交
    //    this.getChannelsStore().reload();
    //
    //}

});
