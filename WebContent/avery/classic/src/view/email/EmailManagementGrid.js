Ext.define('AOC.view.email.EmailManagementGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['AOC.util.Helper', 'AOC.view.ux.CustomSearchField'],
    controller: 'emailManagementController',
    itemId: 'emailManagementGrid',
    alias: 'widget.emailmanagementgrid',
    cls: 'aoc-panel',
    emptyText: AOCLit.emptyDataMsg,
    requires: [
        'AOC.view.email.EmailManagementController',
        'Ext.ux.ProgressBarPager'
    ],
    reserveScrollbar: true,
    columnLines: false,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    listeners: {
        activate:'onActivateGrid',
        cellclick:'onCellClick',
        rowcontextmenu:'onRowContextMenu'
    },
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            columns: this.buildColumns(),
            dockedItems: this.buildDockedItems(),
            store: Ext.create('AOC.store.EmailManagementStore', {
                storeId: 'EmailManagementStoreId'
            }),
            tbar: {
                height: AOC.config.Settings.config.defaultTbarHeight,
                items: me.buildtbar()
            }
        });
        this.callParent(arguments);
    },
    buildColumns: function () {
        var me = this;
        return [{
                header: '<img src="' + AOC.config.Settings.buttonIcons.menuIcon + '" />',
                width: 40,
                menuDisabled: true,
                align:'center',
                sortable:false,
                resizable:false,
                renderer:Helper.actionColumnRenderer
            }, {
                header: Settings.config.defaultIcons.commentColumnIcon,
                width: 40,
                dataIndex: 'comment',
                tooltip: 'Comments',
                menuDisabled: true,
                align: 'center',
                renderer: function (value, metaData, rec) {
                    if (value) {
                        var status = rec.get('status');
                        if (status == AOCLit.emailUnidentifiedStatus | status == AOCLit.emailErrorStatus) {
                            metaData.tdStyle = 'cursor:pointer;';
                            return Settings.config.defaultIcons.commentColumnIcon;
                        }
                    } 
                    return '';
                }
            }, {
                header: Settings.config.defaultIcons.errorColumnIcon,
                width: 40,
                dataIndex: 'error',
                tooltip: 'Error',
                menuDisabled: true,
                align:'center',
                renderer: function (value, metadata, rec) {
                    if (value) {
//                        var error = Ext.String.htmlEncode(rec.data.error);
//                        metadata.tdAttr = 'data-qtip="<font color=blue>' + error + '</font>"';
                    	metadata.tdStyle = 'cursor:pointer;';
                        return Settings.config.defaultIcons.errorColumnIcon;
                    } else {
                        return '';
                    }
                }
            }, {
                text: AOCLit.orderSource,
                width: 120,
                align: 'center',
                dataIndex: 'orderSource',
                menuDisabled: true,
                renderer: function (v, metadata, record) {
                    if (v == 'Email')
                        return '<i data-qtip="<font color=blue>Email</font>" style="font-size:16px; color:black"; class="viewemail fa fa-envelope-o"></i>';
                    else {
                        return '<i data-qtip="<font color=blue>Web</font>" style="font-size:16px; color:black"; class="fa fa-globe"></i>';
                    }
                }
            }, {
                text: AOCLit.TrackingNo,
                width: 120,
                align: 'left',
                dataIndex: 'id',
                renderer: function (v, metadata, record) {
                    return 'E# ' + v;
                }

            }, {
                text: AOCLit.partnerName,
                width: 150,
                name: 'PartnerName',
                align: 'left',
                menuDisabled: true,
                sortable: false,
                dataIndex: 'PartnerName',
                renderer: Helper.tipRenderer
            }, {
                text: AOCLit.RBO,
                width: 150,
                dataIndex: 'RBO',
                align: 'left',
                menuDisabled: true,
                sortable: false,
                renderer: Helper.tipRenderer
            },{
                text: AOCLit.siteName,
                sortable: true,
                align: 'left',
                width: 120,
                dataIndex: 'siteId',
                align: 'left',
                listeners: {
                	'afterrender': Helper.siteNameForSuperAdminOnly
                },
                renderer:function(v, metadata, rec){
                	return Helper.getSiteName(v);
                }
            },{
                text: AOCLit.Status,
                width: 180,
                dataIndex: 'status',
                align: 'left',
                renderer: function (v, metadata, rec) {
                    return Helper.getSatus(rec);
                }
            }, {
                text: AOCLit.senderEmailID,
                width: 180,
                align: 'left',
                dataIndex: 'senderEmailId',
                renderer: Helper.tipRenderer
            }, {
                text: AOCLit.Subject,
                width: 120,
                dataIndex: 'subject',
                align: 'left',
                renderer: Helper.tipRenderer
            }, {
                text: AOCLit.receiverEmailID,
                width: 180,
                align: 'left',
                dataIndex: 'Email',
                renderer: Helper.tipRenderer
            }, {
                text: AOCLit.ccMailId,
                width: 180,
                align: 'left',
                dataIndex: 'CC',
                renderer: Helper.tipRenderer
            }, {
                text: AOCLit.CSRName,
                width: 120,
                align: 'left',
                dataIndex: 'csrName'
            }, {
                text: AOCLit.receivedDate,
                width: 150,
                align: 'left',
                dataIndex: 'receivedDate',
                renderer:Helper.onDateRendererSiteTimeZoneSpecific
            }, {
                text: AOCLit.readDate,
                width: 150,
                align: 'left',
                dataIndex: 'readDate',
                renderer:Helper.onDateRendererSiteTimeZoneSpecific
            }, {
                text: AOCLit.acknowledgeDate,
                width: 180,
                align: 'left',
                dataIndex: 'acknowledgementDate',
                renderer:Helper.onDateRendererSiteTimeZoneSpecific
            }, {
                text: AOCLit.lastmodifiedby,
                width: 150,
                align: 'left',
                dataIndex: 'lastModifiedBy'
            }, {
                text: AOCLit.lastmodifieddate,
                width: 180,
                align: 'left',
                dataIndex: 'lastModifiedDate',
                renderer:Helper.onDateRendererSiteTimeZoneSpecific
            }
        ];
    },

    tipRenderer: function (v, metaData) {
        if (v) {
            metaData.tdAttr = 'data-qtip="<font color=blue>' + Ext.String.htmlEncode(v) + '</font>"';
            return Ext.String.htmlEncode(v);
        } else {
            return '';
        }
    },
    buildtbar: function () {
        var me = this;
        return [{
                xtype: 'tbtext',
                itemId: 'EmailQueueTextId',
                text: 'Email Queue',
                style: AOC.config.Settings.config.tabHeaderTitleStyle
            },
            '->', {
                xtype: 'customsearchfield',
                searchCriteria: '',
                store: Ext.data.StoreManager.lookup(me.store),
                width: 200,
                emptyText: "Search by Email Track # "
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
