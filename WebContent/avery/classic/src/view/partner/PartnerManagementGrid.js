Ext.define('AOC.view.partner.PartnerManagementGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'AOC.view.partner.PartnerProductLineGrid',
        'AOC.view.ux.CustomSearchField',
        'AOC.util.Helper',
        'AOC.view.partner.PartnerController'
    ],
    controller: 'partnerMain',
    cls: 'aoc-panel',
    itemId: 'PartnerMangementitemId',
    alias: 'widget.partnermanagementgrid',
    emptyText: AOCLit.emptyDataMsg,
    recordBeingEdit: null,
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            columns: this.buildColumns(),
            columnLines: false,
            store: Ext.create('AOC.store.PartnerManagementStore', {
                storeId: 'PartnerManagementStoreId'
            }),
            listeners: {
                activate: function (obj) {
                    var userInfo = AOCRuntime.getUser(),
                        roleId = userInfo.role,
                        siteId = userInfo.siteId,
                        userId = userInfo.id,
                        userEmailId = userInfo.email;
                    me.down('pagingtoolbar').bindStore(obj.getStore());
                    obj.getStore().proxy.extraParams = {
                        siteId: siteId,
                        roleId: roleId,
                        userId: userId,
                        userEmailId: userEmailId
                    };
                }
            },
            tbar: {
                height: AOC.config.Settings.config.defaultTbarHeight,
                items: me.buildtbar()
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
            xtype: 'actioncolumn',
            width: 25,
            baseCls: 'custom-action',
            items: [{
                icon: AOC.config.Settings.buttonIcons.menuIcon,
                handler: 'onClickMenu'

            }]
        }, {
            text: AOCLit.partnerName,
            sortable: true,
            dataIndex: 'partnerName',
            align:'left',
            flex: 0.5

        }, {
            text: AOCLit.address,
            sortable: true,
            dataIndex: 'address1',
            align:'left',
            flex: 1,
            renderer: function (v, metaData, record) {
                var value = record.get('address1') + (record.get('address2') ? +', ' + record.get('2') : '') +
                    (record.get('address3') ? +', ' + record.get('address3') : '');

                return value;
            }
        }, {
            text: AOCLit.contactPerson,
            sortable: true,
            dataIndex: 'contactPerson',
            align:'left',
            flex: 0.5
        }, {
            text: AOCLit.Phone,
            sortable: true,
            dataIndex: 'phone',
            align:'left',
            flex: 0.5
        },{
        	text:AOCLit.siteName,
        	sortable:true,
        	dataIndex:'siteName',
            align:'left',
        	flex:0.5,
            listeners: {
            	'afterrender': Helper.siteNameForSuperAdminOnly
            }
        }, {
            text: AOCLit.lastmodifiedby,
            dataIndex: 'lastModifiedBy',
            align:'left',
            width: 120
        }, {
            text: AOCLit.lastmodifieddate,
            dataIndex: 'lastModifiedDate',
            align:'left',
            width: 150
        }];
    },
    buildtbar: function () {
        var me = this;
        return [{
                xtype: 'tbtext',
                itemId: 'PartnertextItemId',
                text: '<div style="color:"><b>Partners</b></div>'
            }, {
                text: 'New',
                itemId: 'newPartner',
                handler: 'createpartner',
                iconCls: 'fa fa-plus',
                iconAlign: 'left',
                cls: 'blue-btn',
                hidden: false,
                listeners:{
                	'afterrender':function(combo){
                		if(AOCRuntime.getUser().role == 3) combo.setHidden(true);
                	}
                }
            },
            '->', {
                xtype: 'customsearchfield',
                searchCriteria: '',
                store: Ext.data.StoreManager.lookup(me.store),
                width: 200,
                emptyText: "Search by Partner Name "
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
