//设置插件路径
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../ux');

Ext.Loader.setPath('Ext.ux', 'ext4.2/ux');

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.toolbar.Paging',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);

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


//修正chrome 浏览器下extjs grid filter 的过滤的编辑面板不好用的问题
// fix hide submenu (in chrome 43)
Ext.override(Ext.menu.Menu, {
    onMouseLeave: function(e) {
        var me = this;


        // BEGIN FIX
        var visibleSubmenu = false;
        me.items.each(function(item) {
            if(item.menu && item.menu.isVisible()) {
                visibleSubmenu = true;
            }
        })
        if(visibleSubmenu) {
            //console.log('apply fix hide submenu');
            return;
        }
        // END FIX


        me.deactivateActiveItem();


        if (me.disabled) {
            return;
        }


        me.fireEvent('mouseleave', me, e);
    }
});
//验证错误不能变回问题，重写RowEditor解决问题
Ext.override(Ext.grid.RowEditor,
    {
        addFieldsForColumn: function (column, initial) {
            var me = this, i, length, field;
            if (Ext.isArray(column)) {
                for (i = 0, length = column.length; i < length; i++) {
                    me.addFieldsForColumn(column[i], initial);
                }
                return;
            }
            if (column.getEditor) {
                field = column.getEditor(null, {
                    xtype: 'displayfield',
                    getModelData: function () {
                        return null;
                    }
                });
                if (column.align === 'right') {
                    field.fieldStyle = 'text-align:right';
                }
                if (column.xtype === 'actioncolumn') {
                    field.fieldCls += ' ' + Ext.baseCSSPrefix + 'form-action-col-field';
                }
                if (me.isVisible() && me.context) {
                    if (field.is('displayfield')) {
                        me.renderColumnData(field, me.context.record, column);
                    } else {
                        field.suspendEvents();
                        field.setValue(me.context.record.get(column.dataIndex));
                        field.resumeEvents();
                    }
                }
                if (column.hidden) {
                    me.onColumnHide(column);
                } else if (column.rendered && !initial) {
                    me.onColumnShow(column);
                }

                // -- start edit
                me.mon(field, 'change', me.onFieldChange, me);
                // -- end edit
            }
        }
    });

Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'AM',

    controllers: [
        'Channels'
    ],

    appFolder: 'app',

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'channelgrid'
            }
        });
    }

});