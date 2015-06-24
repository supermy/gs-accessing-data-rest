//设置插件路径
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'ext4.2-ux');

//Ext.require([
//    '*',
//    'Ext.toolbar.Paging',
//    'Ext.ux.grid.FiltersFeature',//必不可少的
//    'Scripts.*'
//]);
//
//var filters = {
//    alias: 'widget.filters',
//    ftype: 'filters',
//
//    encode: false
//    //, // json encode the filter query
//
//    //指定要对哪些列进行过滤
//    //filters: [{
//    //    type: 'boolean',
//    //    dataIndex: 'IsSuccessed'
//    //}]
//};


Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'AM',

    controllers: [
        'Channels'
    ],

    appFolder: 'app',

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'channelgrid'
            }
        });
    }

});