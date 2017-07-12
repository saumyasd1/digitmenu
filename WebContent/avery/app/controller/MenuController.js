Ext.define('AOC.controller.MenuController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.menuController',
    requires: [
        'AOC.view.ux.Callout',
        'AOC.view.taskmanager.TaskManager'
    ],
    stores: [
    ],
    views: [
        
    ],
    refs: [{
        selector: 'viewport #toolbarviewitemid',
        ref: 'toolbar'
    }, {
        selector: 'viewport',
        ref: 'viewport'
    }, {
        selector: 'viewport #EmailManagementitemId',
        ref: 'emailManagementgrid'
    }, {
        selector: 'viewport #taskManageritemId',
        ref: 'taskManagerGrid'
    }, {
        selector: 'viewport orderqueuegrid',
        ref: 'orderQueueGrid'
    }, {
        selector: 'viewport #PartnerMangementitemId',
        ref: 'partnerMangementgrid'
    }, {
        selector: 'viewport #AddressManageGriditemId',
        ref: 'addressManagegrid'
    }, {
        selector: 'viewport #archiveManageGriditemId',
        ref: 'archiveManagegrid'
    }, {
        ref: 'orderQueueViewContainer',
        selector: 'viewport app-main orderqueueview'
    }, {
        ref: 'clearOrderQueueAdvSearch',
        selector: 'viewport orderqueuegrid #clearadvanedsearch'
    }, {
    	ref:'appMain',
    	selector:'viewport app-main'
    }],
    init: function () {
        var me = this;
        me.control({
            'viewport aocheader': {
                clickprofilemenu: me.onClickProfileMenu
            },
            'viewport aoclogin': {
                login: me.onClickLogIn
            }
        });

        me.listen({
            controller: {
                '*': {
                    'changemainview': me.onChangeMainView
                }
            }
        });

        me.runtime = AOC.config.Runtime;
    },
    changeTabPanel:function(tabIndex){
    	var appMain = this.getAppMain();

        appMain.setActiveTab(tabIndex);
    },
    onChangeMainView: function (xtype, emailQueueId, tabIndex) {
        if (xtype == 'orderqueueview') {
            var store = this.getOrderQueueGrid().getStore(),
                appMain = this.getAppMain();

            appMain.setActiveTab(tabIndex);
            this.getOrderQueueViewContainer().getLayout().setActiveItem(0); //set default item

            //filter order queue grid for respective emailqueue id
            this.getClearOrderQueueAdvSearch().hide();
            store.clearFilter(true);
            store.proxy.setFilterParam('emailQueueId');
            store.setRemoteFilter(true);
            if (!store.proxy.hasOwnProperty('filterParam')) {
                store.proxy.setFilterParam('emailQueueId');
            }
            store.proxy.encodeFilters = function (filters) {
                return filters[0].getValue();
            };
            store.filter({
                id: 'emailQueueId',
                property: 'emailQueueId',
                value: emailQueueId
            });
        }
    },
    onClickLogIn: function (cmp) {
        var me = this,
            form = cmp.down('form'),
            valueObj = form.getValues(),
            userName = valueObj.userName,
            password = valueObj.password;

        if (form.isValid()) {
            Ext.getBody().mask('Please Wait...');
            form.submit({
                method: 'POST',
                url: applicationContext + '/rest/login/user',
                success: function (form, action) {
                    var obj = Ext.decode(action.response.responseText);
                    var tokenExpires = obj.tokenExpiresDays;
                    Helper.setCookie("authorization", obj["token"], tokenExpires);
                    var userInfo = obj["userinfo"];
                    me.runtime.setUser(userInfo);
                    
                    Helper.setCookie("userinfo", JSON.stringify(userInfo), tokenExpires);
                    Helper.updateProfileInfo();

                    Ext.getBody().unmask();
                    me.loadStores();
                    me.changeViewportCard(1);
                },
                failure: function (formss, action) {
                    var myField = form.down('#loginpasswordfield');
                    myField.allowBlank = true;
                    myField.setValue('');
                    Ext.getBody().unmask();
                    Ext.Msg.alert('Incorrect credential', 'Username or password is incorrect.', function () {
                        myField.allowBlank = false;
                    }, me, null);
                }
            });
        }
    },
    changeViewportCard: function (index) {
        var activeCard = Ext.ComponentQuery.query("viewport")[0];
        activeCard.getLayout().setActiveItem(index);
    },
    onClickMainMenu: function (cmp, rec) {
        var me = this,
            xtype = rec.get('xtype'),
            view = rec.get('view');

        me.selectCard(xtype);

        switch (xtype) {
        case 'homewrapper':
            break;
        case 'weborderview':
            var webOrderView = Ext.ComponentQuery.query('weborderview')[0];
            Helper.resetWebOrderForm(webOrderView);
            webOrderView.down('#backButtonimage').hide();
            webOrderView.updateHeaderLabel(newWebOrder);
            break;
        default:
            var gridView = Ext.ComponentQuery.query(view)[0],
                clearAdvSarchBtn = gridView.down('#clearadvanedsearch'),
                store = gridView.getStore();

            clearAdvSarchBtn.isVisible() ? clearAdvSarchBtn.hide() : '';
            store.clearFilter(true);
            store.load();
            break;
        }
    },
    selectCard: function (xtype) {
        var me = this,
            cardLayout = me.getMainCard().getLayout(),
            section = Ext.ComponentQuery.query(xtype)[0],
            activeItem = cardLayout.getActiveItem();

        if (activeItem && activeItem.xtype == xtype) {
            return;
        } else {
            if (Ext.isEmpty(section)) {
                section = Ext.widget(xtype);
            }
            if (!Ext.isEmpty(section)) {
                me.runtime.setActiveGrid(section.down('grid'));
                cardLayout.setActiveItem(section);
            }
        }
    },
    onClickProfileMenu: function (e, el) {
        var me = this;
        if (me.profileMenu) {
            me.profileMenu.showAt(e.getX() - 20, e.getY() + 15);
        } else {
            me.profileMenu = Ext.create('AOC.view.ux.CustomMenu', {
                items: [{
                    iconCls: 'fa fa-user aoc-menu-icon',
                    text: 'Profile information',
                    typeIndex: 0
                }, {
                    iconCls: 'fa fa-users aoc-menu-icon',
                    text: 'Manage Users',
                    itemId: 'manageUsers',
                    typeIndex: 1
                }, 
//                {
//                    iconCls: 'fa fa-universal-access aoc-menu-icon',
//                    text: 'Manage Roles',
//                    itemId: 'manageRoles',
//                    typeIndex: 2
//
//                }, 
                {
                    iconCls: 'fa fa-sign-out aoc-menu-icon',
                    text: 'Logout',
                    typeIndex: 3
                }],
                listeners: {
                    scope: me,
                    click: me.onProfileMenuClick,
                    beforeshow: function (menu) {
                        var manageUsers = menu.queryById('manageUsers'),
                        	//manageRoles = menu.queryById('manageRoles'),
                            user = AOCRuntime.getUser(),
                        	role = user.role;
                        if (role == 1) {
                           // manageRoles.show();
                            manageUsers.show();
                        } else if (role == 2) {
                            manageUsers.show();
                            //manageRoles.hide();
                        } else {
                            //manageRoles.hide();
                            manageUsers.hide();
                        }
                    }
                }
            });
            me.profileMenu.showAt(e.getX() - 20, e.getY() + 15);
        }
    },
    onProfileMenuClick: function (menu, item, e) {
        var me = this;
        if (item.typeIndex == 0) {
            me.onProfileMenuItemClick();
        } else if (item.typeIndex == 1) {
            me.onManageUserMenuItemClick();
        } else if (item.typeIndex == 2) {
            me.onManageRoleMenuItemClick();
        } else {
            me.onLogout();
        }
    },
    onProfileMenuItemClick: function () {
        var win = Ext.create('AOC.view.users.myprofile.AddUserWindow',{
        	title:'My Profile', 
        	mode:'view'
    	});
        var viewPort = this.getViewport(),
        	profileImage = win.lookupReference('profileImage');
		
		profileImage.setSrc(Helper.getFilePath());
        viewPort.add(win).showBy(Ext.getBody());
    },
    onManageUserMenuItemClick: function () {
    	var win = Ext.create('AOC.view.users.manage.Wrapper',{title:'Manage Users'});
    	var viewPort = this.getViewport();
        viewPort.add(win).showBy(Ext.getBody());
//    	win.show();
    },
    onManageRoleMenuItemClick: function () {
    	var win = Ext.create('AOC.view.users.roles.ManageRoleWindow',{title:'Manage Roles'});
    	win.show();
    },
    onLogout: function () {
        var me = this;
        Helper.deleteCookie("authorization");
        Helper.deleteCookie("userinfo");
        Helper.deleteCookie('menuList');
        window.location.reload();
    },
    
    selectProrfileCard: function (index) {
        var mainprofilewrapper = Ext.ComponentQuery.query('profileinfowrapper #mainprofilewrapper')[0];
        mainprofilewrapper.getLayout().setActiveItem(index);
    },
    selectMenuItem: function (xtype) {
        var cmp = Ext.ComponentQuery.query('viewport canwas mainmenu')[0],
            store = cmp.getStore(),
            rec = store.findRecord('xtype', xtype);

        rec ? cmp.getSelectionModel().select(rec) : cmp.getSelectionModel().deselectAll();
    },
    loadStores: function () {
        Helper.loadVariableComboStore('FreightTerms');
        Helper.loadVariableComboStore('ShippingMethod');
        Helper.loadVariableComboStore('CSR');
        Helper.loadVariableComboStore('OrderType');
        Helper.loadVariableComboStore('APOType');
        Helper.loadVariableComboStore('EndCustomer');
        Helper.loadVariableComboStore('SplitShipset');
        Helper.loadCodeStore('code');
        Helper.loadCodeStore('orderfilequeue');
        Helper.loadCodeStore('orderline');
        Helper.loadCodeStore('orderemailqueue');
        
        //get all variable data
        Helper.loadAllVariableComboStore('FreightTerms');
        Helper.loadAllVariableComboStore('ShippingMethod');
        Helper.loadAllVariableComboStore('OrderType');
        Helper.loadAllVariableComboStore('APOType');
        Helper.loadAllVariableComboStore('EndCustomer');
        Helper.loadAllVariableComboStore('SplitShipset');
        
        this.getServerSystemOffset();
        //this.getTimeZone();
        //this.loadCsrList();
    },
    loadCsrList:function(){
    	var userInfo = AOCRuntime.getUser(),
	        roleId = userInfo.role,
	        siteId = userInfo.siteId,
	        store = Ext.data.StoreManager.lookup('AssignCSRStore') != null ?  Ext.data.StoreManager.lookup('AssignCSRStore') : Ext.create('AOC.store.AssignCSRStore',{storeId:'AssignCSRStore'});
    	
        store.proxy.extraParams = {
	        siteId: siteId,
	        roleId: roleId
	    };
        store.load();
    },
    getTimeZone: function () {
        Ext.Ajax.request({
            url: applicationContext + '/rest/users/globaltimezone',
            success: function (response) {
                var data = JSON.parse(response.responseText),
                    timeZone = data.timeZone;

                AOCRuntime.setTimeZone(timeZone);
            }
        });
    },
    getServerSystemOffset: function () {
        Ext.Ajax.request({
            url: applicationContext + '/rest/users/server/offset',
            success: function (response) {
                var data = JSON.parse(response.responseText),
                    timeZoneOffset = data.offset;

                AOCRuntime.setTimeOffset(timeZoneOffset);
            }
        });
    }
});
