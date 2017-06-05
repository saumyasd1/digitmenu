Ext.define('AOC.controller.MenuController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.menuController',
    requires: [
        'AOC.view.ux.Callout',
        'AOC.view.taskmanager.TaskManager'
    ],
    stores: [
        'Sections',
        'PartnerManagementStore',
        'EmailManagementStore',
        'AddressStore',
        'OrderQueueStore',
        'OrderCharts',
        'HomePageOders'
    ],
    views: [
        'base.BaseToolbar',
        'Viewport',
        'users.manage.User',
        'users.roles.Role'
    ],
    refs: [{
        selector: 'viewport #toolbarviewitemid',
        ref: 'toolbar'
    }, {
        selector: 'viewport',
        ref: 'viewport'
    }, {
        selector: 'viewport canwas maincontainer',
        ref: 'mainCard'
    }, {
        selector: 'viewport #AOCContainer',
        ref: 'mainContainer'
    }, {
        selector: 'viewport #EmailManagementitemId',
        ref: 'emailManagementgrid'
    }, {
        selector: 'viewport #taskManageritemId',
        ref: 'taskManagerGrid'
    }, {
        selector: 'viewport #OrderQueueGridItemId',
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
        ref: 'mainMenu',
        selector: 'viewport canwas mainmenu'
    }, {
        ref: 'orderQueueViewContainer',
        selector: 'viewport canwas maincontainer orderqueueview'
    }, {
        ref: 'clearOrderQueueAdvSearch',
        selector: 'viewport orderqueuegrid #clearadvanedsearch'
    }],
    menuInstructions: AOC.config.MenuInstructions,
    init: function () {
        var me = this;
        me.control({
            'viewport canwas mainmenu': {
                clickmenu: me.onClickMainMenu
            },
            'viewport aocheader': {
                clickprofilemenu: me.onClickProfileMenu
            },
            'viewport aoclogin': {
                login: me.onClickLogIn
            },
            'viewport canwas profileinfowrapper #toptoolbar': {
                edit: me.onClickEditProfile,
                changepassword: me.onClickChangePassword
            },
            'viewport canwas profileinfowrapper #bottomtoolbar': {
                save: me.onClickSaveProfile,
                cancel: me.onClickCancelProfile
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
        me.loadSectionStore();
    },

    onChangeMainView: function (xtype, emailQueueId) {
        this.selectCard(xtype);
        if (xtype == 'orderqueueview') {
            var store = this.getOrderQueueGrid().getStore(),
                mainMenu = this.getMainMenu();

            mainMenu.getSelectionModel().select(mainMenu.getStore().getAt(3), false, true); //select tab
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
                    Helper.updateHeaderUserName();
                    Helper.updateProfileInfo();
                    Helper.setCookie("userinfo", JSON.stringify(userInfo), tokenExpires);
                    Helper.setCookie("menuList", JSON.stringify(obj['menuList']), tokenExpires);
                    var sectionStore = me.getSectionsStore();
                    if (obj['menuList']) {
                        sectionStore.loadData(obj['menuList']);
                    }

                    Ext.getBody().unmask();
                    me.loadSectionStore();
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
                }, {
                    iconCls: 'fa fa-universal-access aoc-menu-icon',
                    text: 'Manage Roles',
                    itemId: 'manageRoles',
                    typeIndex: 2

                }, {
                    iconCls: 'fa fa-sign-out aoc-menu-icon',
                    text: 'Logout',
                    typeIndex: 3
                }],
                listeners: {
                    scope: me,
                    click: me.onProfileMenuClick,
                    beforeshow: function (menu) {
                        var manageRoles = menu.queryById('manageRoles'),
                            manageUsers = menu.queryById('manageUsers'),
                            user = AOCRuntime.getUser(),
                        	role = user.role;
                        if (role == 1) {
                            manageRoles.show();
                            manageUsers.show();
                        } else if (role == 2) {
                            manageUsers.show();
                            manageRoles.hide();
                        } else {
                            manageRoles.hide();
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
        var me = this,
            topToolbar = Ext.ComponentQuery.query('profileinfowrapper #toptoolbar')[0];
        me.selectCard('profileinfowrapper');
        me.selectProrfileCard(0);
        me.updateTopToolBar(true, profileInfo);
        me.updateBottomToolBar(false);
        Helper.updateProfileInfo();
        me.selectMenuItem(null);
    },
    onManageUserMenuItemClick: function () {
        this.selectCard('users');
    },
    onManageRoleMenuItemClick: function () {
        this.selectCard('roles');
    },
    onLogout: function () {
        var me = this;
        Helper.deleteCookie("authorization");
        Helper.deleteCookie("userinfo");
        Helper.deleteCookie('menuList');
        window.location.reload();
    },
    onClickEditProfile: function () {
        var me = this,
        	userinfo = me.runtime.getUser(),
        	userId = userinfo.id,
        	win = Ext.create('AOC.view.users.myprofile.AddUserWindow',{
        		 mode  : 'edit',
        		 ID    :  userId,
                 title : 'Edit Profile'
        	});
        win.down('#roledisplayfield').setHidden(false);
        win.down('form').getForm().setValues(userinfo);
        win.down('#newPassword').setValue('');
        var refs = win.getReferences(),
    		profileImage = refs.profileImage;
    		profileImage.setSrc(Helper.getFilePath());
        if(userId == 1){
	        win.down('#site').setHidden(true);
	        win.down('#newPassword').setHidden(false);
	        win.down('#confirmPassword').setHidden(false);
        }
        win.down('#site').setDisabled(true);
        win.down('#role').setHidden(true);
        win.show();
    },
    onClickChangePassword: function () {
        var me = this;
        me.selectProrfileCard(1);
        me.updateTopToolBar(false, changedPassword);
        me.updateBottomToolBar(true);
    },
    selectProrfileCard: function (index) {
        var mainprofilewrapper = Ext.ComponentQuery.query('profileinfowrapper #mainprofilewrapper')[0];
        mainprofilewrapper.getLayout().setActiveItem(index);
    },
    updateTopToolBar: function (flag, title) {
        var topToolbar = Ext.ComponentQuery.query('profileinfowrapper #toptoolbar')[0];
        topToolbar.down('#changepasswordbtn').setVisible(flag);
        topToolbar.down('#editbutton').setVisible(flag);
        if (!Ext.isEmpty(title)) {
            topToolbar.updateTitle(title);
        }
    },
    updateBottomToolBar: function (flag) {
        var bottomToolbar = Ext.ComponentQuery.query('profileinfowrapper #bottomtoolbar')[0];
        bottomToolbar.down('#cancel').setVisible(flag);
        bottomToolbar.down('#save').setVisible(flag);
    },
    onClickSaveProfile: function (cmp) {
        var me = this,
            user = me.runtime.getUser(),
            id = user.id,
            activeForm = mainprofilewrapper = Ext.ComponentQuery.query('profileinfowrapper #mainprofilewrapper')[0].getLayout().getActiveItem();

        Ext.getBody().mask(pleaseWait);
        if (activeForm.xtype == 'changepassword') {
            Ext.Ajax.request({
                method: 'PUT',
                type: 'rest',
                jsonData: activeForm.getValues(),
                url: Settings.getBaseUserUrl() + '/' + id,
                headers: {
                    "Authorization": "Basic YWRtaW46aW5kaWdvMQ=="
                },
                scope: me,
                success: function (res) {
                    Ext.getBody().unmask();
                    var userInfo = Ext.decode(res.responseText);
                    me.runtime.setUser(userInfo.user);
                    Helper.updateHeaderUserName();
                    Helper.setCookie("userinfo", JSON.stringify(userInfo.user), 30);
                    me.selectProrfileCard(0);
                    me.updateTopToolBar(true, profileInfo);
                    me.updateBottomToolBar(false);
                    Helper.updateProfileInfo();
                    var message = (activeForm.xtype == 'createuser') ? personalInformation : password;
                    message = message + savedSuccessfully;
                    Helper.showToast('Success', message);
                },
                failure: function (rsp) {
                    Ext.getBody().unmask();
                    Ext.Msg.alert(weFacedError + "save information", rsp.responseText, null, me, null);
                    return;
                }
            });
        }
    },
    onClickCancelProfile: function (cmp) {
        var me = this;
        me.selectProrfileCard(0);
        me.updateTopToolBar(true, profileInfo);
        me.updateBottomToolBar(false);
    },
    selectMenuItem: function (xtype) {
        var cmp = Ext.ComponentQuery.query('viewport canwas mainmenu')[0],
            store = cmp.getStore(),
            rec = store.findRecord('xtype', xtype);

        rec ? cmp.getSelectionModel().select(rec) : cmp.getSelectionModel().deselectAll();
    },
    loadStores: function () {
    	var userInfo = AOCRuntime.getUser(),
    		currentUserRoleId = userInfo.role,
    		currentUserId = userInfo.id,
    		currentUserSiteId = userInfo.siteId, 
    		homeListStore = Ext.getStore('HomePageOders');
    	if(currentUserRoleId == 3){
    		var	values = {filterSiteId : currentUserSiteId, filterCsrCode: currentUserId},
    			store = Ext.create('AOC.store.HomePageOders');
    		store.proxy.setFilterParam('query');
            store.setRemoteFilter(true);
            if (!store.proxy.hasOwnProperty('filterParam')) {
                store.proxy.setFilterParam('query');
            }
            store.proxy.encodeFilters = function(filters) {
                return filters[0].getValue();
            };
            store.filter({
                id: 'query',
                property: 'query',
                value: Ext.JSON.encode(values)
            });			
    	}
    	else{
    		homeListStore.proxy.extraParams = { siteId: currentUserSiteId };
    		homeListStore.load();
    	}
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
        this.getTimeZone();
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
    loadSectionStore: function () {
        var me = this,
            sectionStore = me.getSectionsStore(),
            menuList = Helper.getCookie('menuList') ? JSON.parse(Helper.getCookie('menuList')) : '';
        if (menuList) {
            sectionStore.loadData(menuList);
        }
    }
});
