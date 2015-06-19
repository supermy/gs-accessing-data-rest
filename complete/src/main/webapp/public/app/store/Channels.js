Ext.define('AM.store.Channels', {
    extend: 'Ext.data.Store',

    //fields: ['pkId','name', 'code'],
    //data: [
    //    {name: 'Ed',    code: 'ed@sencha.com'},
    //    {name: 'Tommy', code: 'tommy@sencha.com'}
    //]

    autoLoad: true,
    autoSync: true,
    model: 'AM.model.Channel',
    proxy: {
        type: 'rest',
        url: '/channel_auth',
        limitParam: 'size',
        reader: {
            type: 'json',
            root: '_embedded.channels'
        },
        writer: {
            type: 'json'
        }
    },
    pageSize:2,
    currentPage:0

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




