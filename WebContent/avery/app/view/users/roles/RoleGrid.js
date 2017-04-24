Ext.define('AOC.view.users.roles.RoleGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['AOC.view.ux.CustomSearchField'],
    itemId: 'rolessgriditemId',
    alias: 'widget.rolesgrid',
    cls: 'aoc-panel',
    emptyText: AOCLit.emptyDataMsg,
    store: Ext.create('AOC.store.RoleStore', {
        storeId: 'RoleStoreId'
    }),
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            columns: this.buildColumns(),
            columnLines: false,
            tbar: {
                height: AOC.config.Settings.config.defaultTbarHeight,
                items: me.buildtbar()
            },
            dockedItems: this.buildDockedItems(),
            listeners: {
                cellclick: 'onCellClickToView'
            }
        });
        this.callParent(arguments);
    },
    buildColumns: function () {
        return [ {
            text: 'Role Name',
            sortable: true,
            dataIndex: 'roleName',
            flex: 0.5

        }, {
            text: 'View Users',
            sortable: true,
            flex: 0.5,
            align: 'center',
            renderer: function (v, metadata, record) {
                return '<i style="font-size:16px; color:black; cursor:pointer;" class="viewuser fa fa-user-circle-o" ></i>';
            }
        }, {
            text: 'Edit Permissions',
            sortable: true,
            flex: 0.5,
            align: 'center',
            renderer: function (v, metadata, record) {
                return '<i style="font-size:16px; color:black; cursor:pointer;" class="editpermission fa fa-lock" ></i>';
            }
        }, {
            text: 'Delete',
            flex: 0.1,
            data: '',
            align: 'center',
            renderer: function (v, cell, record) {
                return '<i style="cursor:pointer;font-size:16px;" class="deleterole fa fa-trash"></i>';
            }
        }];
    },
    buildtbar: function () {
        var me = this;
        return [{
                xtype: 'tbtext',
                itemId: 'roleTextItemId',
                text: '<b>Role Management</b>'
            }, {
                xtype: 'tbspacer',
                width: 10
            }, {
                iconCls: 'fa fa-plus',
                text: 'Add Role',
                itemId: 'newRole',
                handler: 'createRoleWindow',
                hidden: false,
                iconAlign: 'left',
                ui: 'blue',
                cls: 'blue-btn'
            },
            '->', {
                xtype: 'customsearchfield',
                searchCriteria: '',
                store: Ext.data.StoreManager.lookup(me.store),
                width: 200,
                emptyText: 'Search by Role Name'
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
            plugins: Ext.create('Ext.ux.ProgressBarPager', {
                width: 250
            })

        }];
    }

});
