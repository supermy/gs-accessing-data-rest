Ext.define('AM.store.Channels', {
    extend: 'Ext.data.Store',
    storeId: 'channelsid',

    total: 1,//数据增减的时候，记录动态记录总数

    autoLoad: true,
    autoSync: true,

    remoteFilter: true,
    remoteSort: true,

    pageSize: 25,
    currentPage: 1,

    sorters: [{
        property: 'name',
        direction: 'ASC'
    }, {
        property: 'code',
        direction: 'DESC'
    }],


    model: 'AM.model.Channel',

    proxy: {
        type: 'rest',
        //url: '/channel_auth',
        url: '/channel_auth/filter', //带filter 查询的支撑后台
        limitParam: 'size',
        reader: {
            type: 'json',
            totalProperty: 'PAGE.totalElements',
            root: 'DATA'
        },
        writer: {
            type: 'json'
        },


        processResponse: processResponse,//针对spring-data-rest 的返回值统一预处理为DATA
        doRequest: doRequest,//
        afterRequest: afterRequest  //操作提示统一处理
    },

    listeners: {

        metachange: metachange,
        beforeload: beforeload  //提交参数预处理
    }

});




