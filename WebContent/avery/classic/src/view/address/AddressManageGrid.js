Ext.define('AOC.view.address.AddressManageGrid', {
    extend: 'Ext.grid.Panel',
    itemId: 'AddressManageGriditemId',
    alias: 'widget.addressmanagegrid',
    requires: ['AOC.view.ux.CustomSearchField', 'AOC.view.address.AddressController'],
    controller: 'addresscontroller',
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
            store: Ext.create('AOC.store.AddressStore', {
                storeId: 'AddressStoreId'
            }),
            listeners: {
                activate: function (obj) {
                    var userInfo = AOCRuntime.getUser(),
                        roleId = userInfo.role,
                        siteId = userInfo.siteId,
                        userId = userInfo.id,
                        userEmailId = userInfo.email;
                    obj.down('pagingtoolbar').bindStore(obj.getStore());
                    obj.getStore().proxy.extraParams = {
                        siteId: siteId,
                        roleId: roleId,
                        userId: userId,
                        userEmailId: userEmailId
                    };
                }
            },
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
        return [{
                text: '',
                width: 20,
                xtype: 'actioncolumn',
                items: [{
                    icon: AOC.config.Settings.buttonIcons.menuIcon,
                    handler: 'onClickMenu'
                }]
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
                flex: 1.5
            }, {
                text: AOCLit.address,
                width: 120,
                align:'left',
                sortable: true,
                dataIndex: 'address',
                flex: 1.5
            }, {
                text: AOCLit.siteNumber,
                width: 120,
                align:'left',
                sortable: true,
                dataIndex: 'siteNumber',
                flex: 1.5
            }, {
                text: AOCLit.Contact,
                width: 150,
                dataIndex: 'contact',
                flex: 1
            }, {
                text: AOCLit.Phone1,
                width: 150,
                dataIndex: 'phone1',
                flex: 1
            }, {
                text: AOCLit.fax,
                width: 150,
                dataIndex: 'fax',
                flex: 1
            }, {
                text: AOCLit.Email,
                width: 150,
                dataIndex: 'email',
                flex: 1
            },{
            	text:AOCLit.siteName,
            	sortable:true,
            	dataIndex:'siteName',
            	flex:1,
                listeners: {
                	'afterrender': Helper.siteNameForSuperAdminOnly
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
                handler: 'openAddAddressWindow',
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
