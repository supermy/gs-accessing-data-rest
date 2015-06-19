Ext.define('AM.controller.Channels', {
    extend: 'Ext.app.Controller',

    views: [
        'channel.List',
        'channel.Edit'

    ],
    stores: [
        'Channels'
    ],
    models: [
        'Channel'
    ],

    init: function() {
        this.control({
            'viewport > channellist': {
                itemdblclick: this.editChannel
            },
            'channeledit button[action=save]': {
                click: this.updateChannel
            }
        });
    },

    editChannel: function(grid, record) {
        console.log('Double clicked on ' + record.get('name'));
        var view = Ext.widget('channeledit');

        view.down('form').loadRecord(record);
    },

    //updateUser: function(button) {
    //    console.log('clicked the Save button');
    //}

    updateChannel: function(button) {

        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);

        console.log('Save ' + record.get('pkId'));
        console.log('Save ' + record.get('name'));

        win.close();
        // synchronize the store after editing the record
        this.getChannelsStore().sync();
    }

});