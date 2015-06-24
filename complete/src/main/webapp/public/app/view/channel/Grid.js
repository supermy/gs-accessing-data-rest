Ext.define('AM.view.channel.Grid', {
    extend: 'Ext.grid.Panel',
    requires:[
        'Ext.ux.grid.FiltersFeature'
    ],
    features:[
        {
            ftype: 'filters',
            encode: true
        }
    ],

    alias: 'widget.channelgrid',
    store: 'Channels',
    layout: {
        type: 'border'
    },
    frame: true,
    columnLines: true,
    closable:true,
    loadMask: true,

    title: '渠道秘钥管理',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {

            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    text: '添加',
                    action: 'add',
                    iconCls: 'add_btn'
                }, {
                    text: '添加(form)',
                    action: 'addform',
                    iconCls: 'addform_btn'
                }, {
                    text: '删除',
                    itemId: 'deletechannel',
                    action: 'del',
                    disabled: true,
                    iconCls: 'del_btn'
                }]
            },
                {
                weight: 2,
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                //    {
                    //    xtype: 'tbtext',
                    //    text: '<b>@cfg</b>'
                    //}, '|', {
                    //    text: 'autoSync',
                    //    enableToggle: true,
                    //    pressed: true,
                    //    tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
                    //    scope: this,
                    //    toggleHandler: function(btn, pressed){
                    //        this.store.autoSync = pressed;
                    //    }
                    //}, {
                    //    text: 'batch',
                    //    enableToggle: true,
                    //    pressed: true,
                    //    tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
                    //    scope: this,
                    //    toggleHandler: function(btn, pressed){
                    //        this.store.getProxy().batchActions = pressed;
                    //    }
                    //}, {
                    //    text: 'writeAllFields',
                    //    enableToggle: true,
                    //    pressed: false,
                    //    tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
                    //    scope: this,
                    //    toggleHandler: function(btn, pressed){
                    //        this.store.getProxy().getWriter().writeAllFields = pressed;
                    //    }
                    //},
                    {
                        xtype: 'pagingtoolbar',
                        store: 'Channels',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
            //    , {
            //    weight: 1,
            //    xtype: 'toolbar',
            //    dock: 'bottom',
            //    ui: 'footer',
            //    items: ['->', {
            //        iconCls: 'icon-save',
            //        text: 'Sync',
            //        scope: this,
            //        handler: this.onSync
            //    }]
            //}
            ],

            xtype: 'gridpanel',
            store: 'Channels',
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: '用户名',
                    flex: 1,
                    filter: {type: 'string'},
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'code',
                    text: '密码',
                    flex: 1,
                    filter: {type: 'string'},
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                }, {
                    text: ' 秘钥',
                    flex: 2,
                    width: 80,
                    sortable: true,
                    dataIndex: 'pwd',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    text: '令牌有效期',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'tokenExpire',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    header: ' 服务器IP 地址',
                    flex: 2,
                    width: 80,
                    sortable: true,
                    dataIndex: 'iplist',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    text: ' 禁止时长',
                    flex: 1,
                    width: 80,
                    sortable: true,
                    dataIndex: 'ipBindtime',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    text: '访问间隔',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'ipTimeout',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    header: '访问次数',
                    flex: 1,
                    width: 80,
                    sortable: true,
                    dataIndex: 'connectCount',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    text: '带宽',
                    flex: 1,
                    width: 80,
                    sortable: true,
                    dataIndex: 'limitBandwidth',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    text: '状态',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'status',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    xtype: 'actioncolumn',
                    flex: 1,
                    width: 30,
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        icon: '/resources/images/icons/fam/delete.gif',
                        tooltip: '删除',
                        scope: this,
                        handler: this.onRemoveClick
                    }]
                }, {
                    xtype: 'actioncolumn',
                    flex: 1,
                    width: 30,
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        icon: '/resources/images/icons/fam/cog.gif',
                        tooltip: '编辑',
                        scope: this,
                        handler: this.onEditClick
                    }]
                }
            ],
            selType: 'rowmodel',
            plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    id: 'rowEditing',
                    saveBtnText: '保存',
                    cancelBtnText: "取消",
                    autoCancel: false,
                    clicksToEdit: 2   //双击进行修改  1-单击   2-双击    0-可取消双击/单击事件
                    ,
                    listeners: {
                        'canceledit': function (rowEditing, context) {
                            // Canceling editing of a locally added, unsaved record: remove it
                            if (context.record.phantom) {
                                context.store.remove(context.record);
                            }
                        }
                    }
                })

            ]
            //
            //columns: [{
            //    text: 'ID',
            //    width: 40,
            //    sortable: true,
            //    resizable: false,
            //    draggable: false,
            //    hideable: false,
            //    menuDisabled: true,
            //    dataIndex: 'id'
            //}, {
            //    header: 'Email',
            //    flex: 1,
            //    sortable: true,
            //    dataIndex: 'email',
            //    field: {
            //        type: 'textfield'
            //    }
            //}, {
            //    header: 'First',
            //    width: 100,
            //    sortable: true,
            //    dataIndex: 'first',
            //    field: {
            //        type: 'textfield'
            //    }
            //}, {
            //    header: 'Last',
            //    width: 100,
            //    sortable: true,
            //    dataIndex: 'last',
            //    field: {
            //        type: 'textfield'
            //    }
            //}]
            //,

            //items: [
            //    {
            //        region: 'center',
            //
            //
            //
            //
            //    }
            //]
        });
        me.callParent(arguments);
    }
    , onRemoveClick: function (grid, rowIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.MessageBox.confirm('提示', '确认(' + rec.get('pkId') + ")[" + rec.get('name') + ']要删除这条记录',
            callBack);

        function callBack(id) {
            if (id == 'yes') {
                grid.getStore().removeAt(rowIndex);
                if (grid.store.getCount() > 0) {
                    grid.getSelectionModel().select(0);
                }
                ;
            }
        }
    }, onEditClick: function (grid, rowIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        console.log(rec);
        var view = Ext.widget('channeledit');
        view.down('form').loadRecord(rec);
    }

});