Ext.define('AOC.view.localitemlookup.LocalItemLookupGrid', {
    extend: 'Ext.grid.Panel',
    itemId: 'localItemLookupGridItemId',
    alias: 'widget.localitemlookupgrid',
    requires: ['AOC.view.ux.CustomSearchField'],
//    controller: 'addresscontroller',
    emptyText: AOCLit.emptyDataMsg,
    cls: 'aoc-panel',
    
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            columns: this.buildColumns(),
            columnLines: false,
            tbar: {
                height: AOC.config.Settings.config.defaultTbarHeight,
                items: me.buildtbar()
            },
            store: Ext.create('AOC.store.LocalItemLookupStore', {
                storeId: 'localItemLookupStoreId'
            }),
            dockedItems: this.buildDockedItems(),
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true
            }
        });
        this.callParent(arguments);
    },
    buildColumns: function () {
        var me = this;
        return [
                {
		            text: '#',
		            width: 35,
		            sortable: true,
		            align:'center',
		            dataIndex: 'id'
		        },
                {
		            text: AOCLit.customerItemNO,
		            width: 120,
		            sortable: true,
		            align:'right',
		            dataIndex: 'customerItemNO',
		            flex: 1
		        },{
		            text: AOCLit.glid,
		            width: 120,
		            sortable: true,
		            align:'left',
		            dataIndex: 'glid',
		            flex: 1
		        },{
		            text: AOCLit.identifierValue,
		            width: 120,
		            sortable: true,
		            align:'left',
		            dataIndex: 'identifierValue',
		            flex: 1
		        },{
		            text: AOCLit.partnerName,
		            width: 120,
		            sortable: true,
		            align:'left',
		            dataIndex: 'partnerName',
		            flex: 1
		        },{
		            text: AOCLit.RBOName,
		            width: 120,
		            sortable: true,
		            align:'left',
		            dataIndex: 'rboName',
		            flex: 1
		        },{
		            text: AOCLit.orgCode,
		            width: 120,
		            sortable: true,
		            align:'left',
		            dataIndex: 'orgCode',
		            flex: 1
		        },{
		            text: AOCLit.system,
		            width: 120,
		            sortable: true,
		            align:'left',
		            dataIndex: 'system',
		            flex: 1
		        },{
		            text: AOCLit.lastModifiedBy,
		            width: 120,
		            sortable: true,
		            align:'left',
		            dataIndex: 'lastModifiedBy',
		            flex: 1
		        },{
		            text: AOCLit.lastModifiedDate,
		            width: 120,
		            sortable: true,
		            align:'left',
		            dataIndex: 'lastModifiedDate',
		            flex: 1
		        }
        ];
        
    },
    buildtbar: function () {
        var me = this;
        return [
            {
                xtype: 'tbtext',
                itemId: 'localItemLookupTextItemId',
                text: '<div style="color:"><b>Local Item Lookup</b></div>'
            },
            '->', {
                xtype: 'customsearchfield',
                searchCriteria: '',
                message: 'Showing all accounts with',
                store: Ext.data.StoreManager.lookup(me.store),
                width: 200,
                emptyText: "Quick Search"
            }, {
                xtype: 'button',
                refrence: 'advancesearchbutton',
                text: AOCLit.advSearchText,
                iconCls: 'fa fa-search',
                iconAlign: "right",
                cls: 'blue-btn',
//                handler: 'openAdvancedSearchWindow'
            }, {
                hidden: true,
                iconCls: 'fa fa-times',
                cls: 'blue-btn',
                itemId: 'clearadvanedsearch',
                reference: 'clearAdvSearch',
                handler: 'clearAdvancedSearch',
                tooltip: 'Clear Search'
            }
        ];
    },
    buildDockedItems: function () {
        return [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            ui: 'darktoolbar',
            itemId: 'pagingtoolbar',
            displayInfo: true,
            pageSize: pageSize,
            plugins: Ext.create('Ext.ux.ProgressBarPager', {
                width: 250
            })

        }];
    }
});
