Ext.define('AOC.view.address.AddressManageGrid', {
    extend: 'Ext.grid.Panel',
    itemId: 'AddressManageGriditemId',
    alias: 'widget.addressmanagegrid',
    requires: ['AOC.view.ux.CustomSearchField', 'AOC.view.address.AddressController'],
    controller: 'addresscontroller',
    emptyText: AOCLit.emptyDataMsg,
    cls: 'aoc-panel',
    
    listeners: {
        activate:'onActivateGrid',
        rowcontextmenu:'onRowContextMenu',
        cellclick:'onCellClick'
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            columns: this.buildColumns(),
            columnLines: false,
            tbar: {
                height: AOC.config.Settings.config.defaultTbarHeight,
                items: me.buildtbar()
            },
            store: Ext.create('AOC.store.AddressStore', {
                storeId: 'AddressStoreId'
            })
            
        });
        this.callParent(arguments);
    },
    buildColumns: function () {
        var me = this;
        return [{
        		header: '<img src="' + AOC.config.Settings.buttonIcons.menuIcon + '" />',
                width: 40,
                sortable:false,
                menuDisabled:true,
                resizable:false,
                align:'center',
                renderer:Helper.actionColumnRenderer
            }, {
                text: AOCLit.orgCode,
                width: 120,
                sortable: true,
                align:'left',
                dataIndex: 'orgCode',
                flex: 1.5
            }, {
                text: AOCLit.partnerName,
                width: 120,
                sortable: true,
                align:'left',
                dataIndex: 'partnerName',
                flex: 1.5,
				renderer:Helper.tipRenderer
            }, {
                text: AOCLit.address,
                width: 120,
                align:'left',
                sortable: true,
                dataIndex: 'address',
                flex: 1.5,
				renderer:Helper.tipRenderer
            }, {
                text: AOCLit.siteNumber,
                width: 120,
                align:'left',
                sortable: true,
                dataIndex: 'siteNumber',
                flex: 1.5,
				renderer:Helper.tipRenderer
            }, {
                text: AOCLit.Contact,
                width: 150,
                align:'left',
                dataIndex: 'contact',
                flex: 1,
				renderer:Helper.tipRenderer
            }, {
                text: AOCLit.Phone1,	
                width: 150,
                align:'left',
                dataIndex: 'phone1',
                flex: 1
            },{
                text: AOCLit.freightTerm,
                width: 150,
                align:'left',
                dataIndex: 'freightTerms',
                flex: 1
            },{
                text: AOCLit.shippingMethod,
                width: 150,
                align:'left',
                dataIndex: 'shippingMethod',
                flex: 1.6
            },{
                text: AOCLit.shippingInstructions,
                width: 150,
                align:'left',
                dataIndex: 'shippingInstructions',
                flex: 1.5
            }, {
                text: AOCLit.fax,
                width: 150,
                align:'left',
                dataIndex: 'fax',
                flex: 1,
				renderer:Helper.tipRenderer
            }, {
                text: AOCLit.Email,
                width: 150,
                align:'left',
                dataIndex: 'email',
                flex: 1,
				renderer:Helper.tipRenderer
            },{
            	text:AOCLit.siteName,
            	sortable:true,
            	dataIndex:'siteId',
            	align:'left',
            	flex:1,
                listeners: {
                	'afterrender': Helper.siteNameForSuperAdminOnly
                },
                renderer:function(v, metadata, rec){
                	return Helper.getSiteName(v);
                }
            }, {
                text: AOCLit.siteType,
                width: 150,
                align:'left',
                dataIndex: 'siteType',
                flex: 1
            }
        ];
    },
    buildtbar: function () {
        var me = this;
        return [
            {
                xtype: 'tbtext',
                itemId: 'addressManagetextItemId',
                text: '<div style="color:"><b>Address-Manage</b></div>'
            }, {
                text: 'New',
                itemId: 'newAddress',
                iconCls: 'fa fa-plus',
                cls: 'blue-btn',
                handler: 'onAddAddressBtnClick',
                listeners:{
                	'afterrender':function(btn){
                		if(AOCRuntime.getUser().role == 3) btn.setHidden(true);
                	}
                }
            },
            '->', {
                xtype: 'customsearchfield',
                searchCriteria: '',
                message: 'Showing all accounts with',
                store: Ext.data.StoreManager.lookup(me.store),
                width: 200,
                emptyText: "Search by Site Number"
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
            }
        ];
    },
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        ui: 'darktoolbar',
        itemId: 'pagingtoolbar',
        displayInfo: true,
        pageSize: pageSize,
        plugins: Ext.create('Ext.ux.ProgressBarPager', {
            width: 250
        })
    }]
});
