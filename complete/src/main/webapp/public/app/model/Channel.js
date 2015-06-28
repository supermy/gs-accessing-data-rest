Ext.define('AM.model.Channel', {
    extend: 'Ext.data.Model',
    fields: [
        'pkId','name', 'code', 'pwd', 'tokenExpire', 'iplist',
        'ipBindtime', 'ipTimeout', 'connectCount', 'limitBandwidth',
        'status','createDate','updateDate','createBy','updateBy'],
    idProperty:'pkId',
    clientIdProperty:'pkId'
    //,
    //
    //validations: [{
    //    type: 'length',
    //    field: 'name',
    //    min: 4
    //}, {
    //    type: 'length',
    //    field: 'code',
    //    min: 4
    //}, {
    //    type: 'length',
    //    field: 'pwd',
    //    min: 10
    //}]
});