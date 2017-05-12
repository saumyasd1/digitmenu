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
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            columns: this.buildColumns(),
            dockedItems: this.buildDockedItems(),
            store: Ext.create('AOC.store.EmailManagementStore', {
                storeId: 'EmailManagementStoreId'
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
            }
        });
        this.callParent(arguments);
    },
    buildColumns: function () {
        var me = this;
        return [{
                header: '<img src="' + AOC.config.Settings.buttonIcons.menuIcon + '" />',
                width: 25,
                xtype: 'actioncolumn',
                menuDisabled: true,
                baseCls: 'custom-action',
                items: [{
                    icon: AOC.config.Settings.buttonIcons.menuIcon,
                    handler: 'onClickMenu' //'showMenu'
                }]
            }, {
                header: Settings.config.defaultIcons.commentColumnIcon,
                width: 40,
                dataIndex: 'comment',
                tooltip: 'Comments',
                menuDisabled: true,
                baseCls: 'custom-action',
                renderer: function (value, metaData, rec) {
                    if (value) {
                        var status = rec.get('status');
                        if (status == AOCLit.emailUnidentifiedStatus | status == AOCLit.emailErrorStatus) {
                            var comment = Ext.String.htmlEncode(value);
                            metaData.tdAttr = 'data-qtip="<font color=blue>' + comment + '</font>"';
                            return Settings.config.defaultIcons.commentColumnIcon;
                        }
                    } else {
                        return '';
                    }
                }
            }, {
                text: AOCLit.orderSource,
                width: 100,
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
                width: 80,
                align: 'left',
                dataIndex: 'id',
                renderer: function (v, metadata, record) {
                    return 'E# ' + v;
                }

            }, {
                text: AOCLit.partnerName,
                width: 150,
                name: 'PartnerName',
                menuDisabled: true,
                sortable: false,
                dataIndex: 'PartnerName'
            }, {
                text: AOCLit.RBO,
                width: 150,
                dataIndex: 'RBO',
                menuDisabled: true,
                sortable: false
            }, {
                text: AOCLit.senderEmailID,
                width: 180,
                dataIndex: 'senderEmailId'
            }, {
                text: AOCLit.Subject,
                width: 120,
                dataIndex: 'subject',
                renderer: function (v, metadata) {
                    return me.tipRenderer(v, metadata);
                }
            }, {
                text: AOCLit.receiverEmailID,
                width: 180,
                dataIndex: 'Email'
            }, {
                text: AOCLit.Status,
                width: 180,
                dataIndex: 'status',
                renderer: function (v, metadata, rec) {
                    return Helper.getSatus(rec);
                }
            }, {
                text: AOCLit.ccMailId,
                width: 180,
                dataIndex: 'CC',
                renderer: function (v, metaData) {
                    return me.tipRenderer(v, metaData);
                }
            }, {
                text: AOCLit.CSRName,
                width: 120,
                dataIndex: 'csrName'
            }, {
                text: AOCLit.receivedDate,
                width: 150,
                dataIndex: 'receivedDate'
            }, {
                text: AOCLit.readDate,
                width: 150,
                dataIndex: 'readDate'
            }, {
                text: AOCLit.acknowledgeDate,
                width: 150,
                dataIndex: 'acknowledgementDate'
            }, {
                text: AOCLit.lastmodifiedby,
                width: 120,
                dataIndex: 'lastModifiedBy'
            }, {
                text: AOCLit.lastmodifieddate,
                width: 150,
                dataIndex: 'lastModifiedDate'
            }

        ]
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
                ui: 'blue',
                cls: 'blue-btn',
                handler: 'openAdvancedSearchWindow'
            }, {
                hidden: true,
                iconCls: 'fa fa-times',
                ui: 'blue',
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
