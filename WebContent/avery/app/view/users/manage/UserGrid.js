Ext.define('AOC.view.users.manage.UserGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['AOC.view.ux.CustomSearchField'],
    itemId: 'usersgriditemId',
    alias: 'widget.usersgrid',
    cls: 'aoc-panel',
    controller: 'userMain',
    emptyText: AOCLit.emptyDataMsg,
    recordBeingEdit: null,
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            columns: this.buildColumns(),
            columnLines: false,
            store: Ext.create('AOC.store.UserStore', {
                storeId: 'UserStoreId'
            }),
            tbar: {
                height: AOC.config.Settings.config.defaultTbarHeight,
                items: me.buildtbar()
            },
            dockedItems: this.buildDockedItems(),
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
                    obj.getStore().load();
                }
            },
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
            text: 'First Name',
            width: 120,
            sortable: true,
            dataIndex: 'firstName',
            flex: 0.5

        },{
            text: 'Middle Name',
            width: 120,
            sortable: true,
            dataIndex: 'middleName',
            flex: 0.5
        }, {
            text: 'Last Name',
            width: 120,
            sortable: true,
            dataIndex: 'lastName',
            flex: 1
        }, {
            text: 'Role',
            width: 120,
            sortable: true,
            dataIndex: 'role',
            flex: 0.5,
            renderer: function (value, metadata, record) {
                if (value == 1) {
                    return 'Super Admin';
                } else if (value == 2) {
                    return 'Site Manager';
                } else {
                    return 'CSR';
                }
            }
        }, {
            text: 'Email',
            width: 120,
            sortable: true,
            dataIndex: 'email',
            flex: 0.5
        },{
            text: 'Last Modified By',
            width: 120,
            sortable: true,
            dataIndex: 'lastModifiedBy',
            flex: 0.5
        
        },{
            text: 'Last Modified Date',
            width: 120,
            sortable: true,
            dataIndex: 'lastModifiedDate',
            flex: 0.5
        }];
    },
    buildtbar: function () {
        var me = this;
        return [{
            xtype: 'tbtext',
            itemId: 'UsertextItemId',
            text: '<b>Users</b>'
        }, {
            xtype: 'tbspacer',
            width: 10
        }, {
            text: 'New',
            itemId: 'newUser',
            handler: 'createuser',
            hidden: false,
            iconCls: 'fa fa-plus',
            iconAlign: 'left',
            ui: 'blue',
            cls: 'blue-btn'
        }, '->', {
            xtype: 'customsearchfield',
            searchCriteria: '',
            store: Ext.data.StoreManager.lookup(me.store),
            width: 200,
            emptyText: AOCLit.userGridSearchEmptyText
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
            plugins: Ext.create('Ext.ux.ProgressBarPager', {
                width: 250
            })

        }];
    }
});
