Ext.define('AM.view.channel.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.channeledit',

    title: '编辑渠道信息',
    layout: 'fit',
    autoShow: true,


    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: '名称'
                    },
                    {
                        xtype: 'textfield',
                        name: 'code',
                        fieldLabel: '编码'
                    }
                    ,
                    {
                        xtype: 'textfield',
                        name: 'pwd',
                        fieldLabel: '秘钥'
                    },
                    {
                        xtype: 'textfield',
                        name: 'tokenExpire',
                        fieldLabel: '令牌有效期'
                    },
                    {
                        xtype: 'textfield',
                        name: 'iplist',
                        fieldLabel: '服务器IP 地址'
                    },
                    {
                        xtype: 'textfield',
                        name: 'ipBindtime',
                        fieldLabel: '禁止时长'
                    },
                    {
                        xtype: 'textfield',
                        name: 'ipTimeout',
                        fieldLabel: '访问间隔'
                    },
                    {
                        xtype: 'textfield',
                        name: 'connectCount',
                        fieldLabel: '访问次数'
                    },
                    {
                        xtype: 'textfield',
                        name: 'limitBandwidth',
                        fieldLabel: '带宽'
                    },
                    {
                        xtype: 'textfield',
                        name: 'status',
                        fieldLabel: '状态'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});