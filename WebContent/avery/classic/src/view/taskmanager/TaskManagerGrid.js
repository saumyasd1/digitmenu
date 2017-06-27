Ext.define('AOC.view.taskmanager.TaskManagerGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['AOC.util.Helper'],
    controller: 'taskmanagercontroller',
    itemId: 'TaskManagerGriditemId',
    alias: 'widget.taskmanagergrid',
    cls: 'aoc-panel',
    emptyText: AOCLit.emptyDataMsg,
    reserveScrollbar: true,
    requires: ['AOC.store.TaskManagerStore', 'AOC.view.taskmanager.TaskManagerController'],
    columnLines: false,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    listeners: {
    	cellclick:'onCellClick',
    	rowcontextmenu:'onRowContextMenu',
        activate:'onActivateGrid'
    },
    initComponent: function () {
        var me = this;
        me.columns = this.buildColumns();
        me.dockedItems = this.buildDockedItems();
        Ext.apply(me, {
            tbar: {
                height: 50,
                items: me.buildTbar()
            },
            store: Ext.create('AOC.store.TaskManagerStore', {
                storeId: 'TaskManagerStoreId'
            })
        });
        me.callParent(arguments);
    },
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    buildColumns: function () {
        var me = this;
        return [{
            width: 40,
            header: '<img src="' + AOC.config.Settings.buttonIcons.menuIcon + '" />',
            align:'center',
            renderer:Helper.actionColumnRenderer,
            menuDisabled: true,
            sortable:false,
            resizable:false
        }, {
            header: Settings.config.defaultIcons.commentColumnIcon,
            width: 40,
            dataIndex: 'comment',
            tooltip: 'Comments',
            menuDisabled: true,
            baseCls: 'custom-action',
            renderer: function (value, metaData, rec) {
                if (value) {
                    var comment = Ext.String.htmlEncode(value);
                    metaData.tdAttr = 'data-qtip="<font color=blue>' + comment + '</font>"';
                    return Settings.config.defaultIcons.commentColumnIcon;
                } else {
                    return '';
                }
            }
        }, {
            text: AOCLit.TrackingNo,
            align: 'left',
            dataIndex: 'id',
            flex: 0.5,
            renderer: function (v, metadata, record) {
                return 'E# ' + v;
            }
        }, {
            text: AOCLit.CSRName,
            sortable: true,
            dataIndex: 'csrName',
            align: 'left',
            flex: 0.5
        },{
            text: AOCLit.siteName,
            sortable: true,
            dataIndex: 'siteName',
            align: 'left',
            flex: 0.6,
            listeners: {
            	'afterrender': Helper.siteNameForSuperAdminOnly
            }
        }, {
            text: AOCLit.from,
            sortable: true,
            dataIndex: 'senderEmailId',
            align: 'left',
            flex: 0.9
        }, {
            text: AOCLit.Subject,
            sortable: true,
            dataIndex: 'subject',
            align: 'left',
            flex: 0.5,
            renderer: function (v, metadata) {
                return me.tipRenderer(v, metadata);
            }
        }, {
            text: AOCLit.ccMailId,
            sortable: true,
            dataIndex: 'ccMailId',
            align: 'left',
            flex: 0.5,
            renderer: function (v, metadata) {
                return me.tipRenderer(v, metadata);
            }
        }, {
            text: AOCLit.Status,
            sortable: true,
            dataIndex: 'status',
            align: 'left',
            flex: 0.5,
            renderer: function (v, metadata, rec) {
                return Helper.getSatus(rec);
            }
        }, {
            text: AOCLit.dateTime,
            sortable: true,
            dataIndex: 'createdDate',
            align: 'right',
            flex: 0.6
        }, {
            text: AOCLit.lastModifiedBy,
            dataIndex: 'lastModifiedBy',
            align: 'left',
            flex: 0.5
        }, {
            text: AOCLit.lastModifiedDate,
            dataIndex: 'lastModifiedDate',
            align: 'left',
            flex: 0.6
        }];
    },
    tipRenderer: function (v, metaData) {
        if (v) {
            metaData.tdAttr = 'data-qtip="<font color=blue>' + Ext.String.htmlEncode(v) + '</font>"';
            return Ext.String.htmlEncode(v);
        } else {
            return '';
        }
    },
    buildTbar: function () {
        var me = this;
        return [{
            xtype: 'tbtext',
            itemId: 'TaskManagerTextId',
            text: 'Task Manager',
            style: 'color:#2c3e50;font-weight:bold;'
        }, '->', {
            xtype: 'customsearchfield',
            searchCriteria: '',
            store: Ext.data.StoreManager.lookup(me.store),
            width: 200,
            emptyText: "Search by Email Subject"
        }, {
            xtype: 'button',
            refrence: 'advancesearchbutton',
            text: AOCLit.advSearchText,
            iconCls: 'fa fa-search',
            iconAlign: "right",
            cls: 'blue-btn',
            handler: 'openAdvancedSearchWindow'
        }, {
            hidden: true,
            iconCls: 'fa fa-times',
            cls: 'blue-btn',
            itemId: 'clearadvanedsearch',
            reference: 'clearAdvSearch',
            handler: 'clearAdvancedSearch',
            tooltip: 'Clear Search'
        }];
    },
    buildDockedItems: function () {
        var me = this;
        return [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            ui: 'darktoolbar',
            itemId: 'pagingtoolbar',
            store: me.store,
            displayInfo: true,
            pageSize: pageSize,
            plugins: Ext.create('Ext.ux.ProgressBarPager', {
                width: 250
            })
        }];
    }
});
