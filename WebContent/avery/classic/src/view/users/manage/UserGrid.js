Ext.define('AOC.view.users.manage.UserGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['AOC.view.ux.CustomSearchField'],
    alias: 'widget.usersgrid',
    cls: 'aoc-panel',
    controller: 'usermain',
    
    emptyText: AOCLit.emptyDataMsg,
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
                	me.down('pagingtoolbar').bindStore(obj.getStore());
                    var userInfo = AOCRuntime.getUser(),
                        roleId = userInfo.role,
                        siteId = userInfo.siteId,
                        userId = userInfo.id,
                        userEmailId = userInfo.email;
                    
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
            sortable: true,
            align:'left',
            dataIndex: 'firstName',
            flex: 0.5

        },{
            text: 'Middle Name',
            align:'left',
            sortable: true,
            dataIndex: 'middleName',
            flex: 0.5
        }, {
            text: 'Last Name',
            align:'left',
            sortable: true,
            dataIndex: 'lastName',
            flex: 1
        }, {
            text: 'Role',
            align:'left',
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
            align:'left',
            sortable: true,
            dataIndex: 'email',
            flex: 0.5
        },{
        	text:'Site Name',
        	align:'left',
        	sortable:true,
        	dataIndex:'siteId',
        	flex:0.5,
        	hidden: AOCRuntime.getUser().role == 1 ? false : true,
			renderer:function(v, metadata, rec){
            	return Helper.getSiteName(v);
            }	
        },{
            text: 'Last Modified By',
            align:'left',
            sortable: true,
            dataIndex: 'lastModifiedBy',
            flex: 0.5
        
        },{
            text: 'Last Modified Date',
            align:'left',
            sortable: true,
            dataIndex: 'lastModifiedDate',
            flex: 0.5,
            renderer:Helper.onDateRendererSiteTimeZoneSpecific
        }];
    },
    buildtbar: function () {
        var me = this;
        return [ {
            text: 'New',
            itemId: 'newUser',
            handler: 'createuser',
            hidden: false,
            iconCls: 'fa fa-plus',
            iconAlign: 'left',
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
            pageSize: pageSize,
            displayInfo: true,
            plugins: Ext.create('Ext.ux.ProgressBarPager', {
                width: 250
            })
        }];
    }
});
