Ext.define('AOC.controller.MenuController', {
	extend :'Ext.app.Controller',
	alias: 'controller.menuController',
	requires:[
	     'AOC.view.ux.Callout',
	     'AOC.view.taskmanager.TaskManager'
	],
	stores:[
		'Sections',
		'PartnerManagementStore',
		'EmailManagementStore',
		'AddressStore',
		'OrderQueueStore',
		'OrderCharts',
		'HomePageOders',
		'Roles',
		'WIOrgStore',
		'WISystemStore',
		'WIAOCFieldStore'
	],
	views : [
		'base.BaseToolbar',
		'Viewport',
		'users.manage.User'
	],
	refs : [
		{
			selector : 'viewport #toolbarviewitemid',
			ref : 'toolbar'
		},
		{
			selector : 'viewport',
			ref : 'viewport'
		},
		{
			selector: 'viewport canwas maincontainer',
			ref: 'mainCard'
		},
		{
		   	selector: 'viewport #AOCContainer',
	 	 	ref: 'mainContainer'
	    },
		{
		   	selector: 'viewport #EmailManagementitemId',
	 	 	ref: 'emailManagementgrid'
	    },
	    {
		   	selector: 'viewport #taskManageritemId',
	 	 	ref: 'taskManagerGrid'
	    },
	    {
		   	selector: 'viewport #OrderQueueGridItemId',
	 	 	ref: 'orderQueueGrid'
	    },
	    {
		   	selector: 'viewport #PartnerMangementitemId',
	 	 	ref: 'partnerMangementgrid'
	    },
	    {
		   	selector: 'viewport #AddressManageGriditemId',
	 	 	ref: 'addressManagegrid'
	    },
	    {
		   	selector: 'viewport #archiveManageGriditemId',
	 	 	ref: 'archiveManagegrid'
	    },
	    {
	    	ref: 'mainMenu',
    		selector:'viewport canwas mainmenu'
	    },
	    {
	    	ref: 'orderQueueViewContainer',
    		selector:'viewport canwas maincontainer orderqueueview'
	    },
	    {
	        ref:'clearOrderQueueAdvSearch',
	        selector:'viewport orderqueuegrid #clearadvanedsearch'
	       }
	],
	menuInstructions : AOC.config.MenuInstructions,
	init: function(){
		var me = this;
		me.control({
			'viewport canwas mainmenu' : {
				clickmenu : me.onClickMainMenu
			},
			'viewport aocheader' : {
				clickprofilemenu : me.onClickProfileMenu
			},
			'viewport aoclogin' : {
	        	login : me. onClickLogIn
			},
	        'viewport canwas profileinfowrapper #toptoolbar' : {
				edit : me.onClickEditProfile,
				changepassword:me.onClickChangePassword
			},
			'viewport canwas profileinfowrapper #bottomtoolbar' : {
				save : me.onClickSaveProfile,
				cancel:me.onClickCancelProfile
			}
		});
		
		me.listen({
			controller:{
				'*': {
					'changemainview' : me.onChangeMainView
				}
			}
		});
		
		this.profileMenuTpl = this.buildMenuTpl();
		me.on({
			scope: me,
			myprofile : me.onMyProfile,
			manageusers : me.onManageUsers,
			logout : me.onLogout
		});
		me.runtime = AOC.config.Runtime;
	},
	
	onChangeMainView : function(xtype, emailQueueId){
		this.selectCard(xtype);
		if(xtype == 'orderqueueview'){
			var store = this.getOrderQueueGrid().getStore(),
				mainMenu = this.getMainMenu();

			mainMenu.getSelectionModel().select(mainMenu.getStore().getAt(3), false, true);//select tab
			this.getOrderQueueViewContainer().getLayout().setActiveItem(0);//set default item
			
			//filter order queue grid for respective emailqueue id
			this.getClearOrderQueueAdvSearch().hide();
			store.clearFilter(true);
			store.proxy.setFilterParam('emailQueueId');
            store.setRemoteFilter(true);
            if (!store.proxy.hasOwnProperty('filterParam')) {
                store.proxy.setFilterParam('emailQueueId');
            }
            store.proxy.encodeFilters = function(filters) {
                return filters[0].getValue();
            };
            store.filter({
                id: 'emailQueueId',
                property: 'emailQueueId',
                value: emailQueueId
            });
		}
	},
	onClickLogIn:function(cmp){
		var me = this,
			form = cmp.down('form'),
			valueObj = form.getValues(),
			userName = valueObj.userName,
			password = valueObj.password;
			
		if(form.isValid()){
			Ext.getBody().mask('Please Wait...');
			form.submit({ 
				method:'POST', 
				url:applicationContext+'/rest/login/user', 
				success:function(form, action){
					var obj = Ext.decode(action.response.responseText);
					var tokenExpires = obj.tokenExpiresDays;
					Helper.setCookie("authorization",obj["token"],tokenExpires);
					var userInfo = obj["userinfo"];
					me.runtime.setUser(userInfo);
					me.updateHeaderUserName();
					Helper.setCookie("userinfo",JSON.stringify(userInfo),tokenExpires);
					Ext.getBody().unmask();
					me.loadStores();
					me.changeViewportCard(1);
				},
				failure:function(formss, action){
					var myField = form.down('#loginpasswordfield');
					myField.allowBlank = true;
					myField.setValue('');
					Ext.getBody().unmask();
					Ext.Msg.alert('Incorrect credential','Username or password is incorrect.',function() {
						myField.allowBlank = false;
					},me,null);
				} 
			}); 
		}
	},
	changeViewportCard:function(index){
	    var activeCard=Ext.ComponentQuery.query("viewport")[0];
	    activeCard.getLayout().setActiveItem(index);   
	},
	updateHeaderUserName:function(){
	    var me = this,
			userInfo = me.runtime.getUser(),
			name = userInfo.firstName;
			
	    name = (!Ext.isEmpty(userInfo.lastName))?name+' '+userInfo.lastName:name;
		Ext.ComponentQuery.query('viewport aocheader')[0].updateUserName(name);   
	},
	onClickMainMenu:function(cmp, rec){
		var me=this,
			xtype = rec.get('xtype'),
			view = rec.get('view');
		
		me.selectCard(xtype);
		
		switch (xtype){
			case 'homewrapper':
				break;
			case 'weborderview':
				var webOrderView = Ext.ComponentQuery.query('weborderview')[0];
				Helper.resetWebOrderForm(webOrderView);
				webOrderView.down('#backButtonimage').hide();
				webOrderView.updateHeaderLabel(newWebOrder);
				break;
			case 'wicontainer':
				var gridView = Ext.ComponentQuery.query(view)[0],
			     	store = gridView.getStore();
		   
				//store.clearFilter(true);
				//store.load();	
				break;
			default :
				var gridView = Ext.ComponentQuery.query(view)[0],
				     clearAdvSarchBtn = gridView.down('#clearadvanedsearch'),
				     store = gridView.getStore();
			   
			    clearAdvSarchBtn.isVisible() ?  clearAdvSarchBtn.hide() : '';
				store.clearFilter(true);
				store.load();	
				break;
		}
	},
	selectCard:function(xtype){
		var me=this,
			cardLayout = me.getMainCard().getLayout(),
			section= Ext.ComponentQuery.query(xtype)[0],
			activeItem=cardLayout.getActiveItem();
			
		if(activeItem && activeItem.xtype == xtype){
			return;
		}else{
			if (Ext.isEmpty(section)){
				section = Ext.widget(xtype);
		    }
			if (!Ext.isEmpty(section)){
				me.runtime.setActiveGrid(section.down('grid'));
				cardLayout.setActiveItem(section) ; 
			}
		}
	},
	onClickProfileMenu:function(el){
		var me = this,
			callout = Ext.widget('callout', {
				cls: 'white more-menu-item-callout extra',
				html: me.buildMenuTpl.apply("{}"),
				target: el,
				calloutArrowLocation: 'top-right',
				relativePosition: 't-b',
				relativeOffsets: [-52,23],
				dismissDelay: 0,
				listeners: {
					scope: me,
					afterrender: me.onAfterRenderEditCallout
				}
			});
		callout.show();   
	},
	onAfterRenderEditCallout : function(cmp){
		var me = this;
		cmp.el.on({
			delegate: 'div.user-profile-menu-item',
			click: function(e,element){
				var el = Ext.get(element),
					event = el.getAttribute('event');
					
				if (event && !el.hasCls('edit-menu-disabled')){
					cmp.destroy();
					me.fireEvent(event);
				}
			}
		});
	},
	buildMenuTpl : function(){
		var me=this;
		return Ext.create('Ext.XTemplate',
			'<div style="width:140px !important;border-bottom: none !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="myprofile"">Profile Information</div>',
			'<tpl if="this.isAdmin(values)">',
				'<div style="width:140px !important;border-bottom: none !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="manageusers"">Manage Users</div>',
			'</tpl>',
			'<div style="width:140px !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="logout"">Logout</div>',
			//'</tpl>',
			{
				isAdmin : function(v){
					return  true;
				}
			}
		);
	},
	onMyProfile:function(){
		var me=this,
			topToolbar = Ext.ComponentQuery.query('profileinfowrapper #toptoolbar')[0];
		me.selectCard('profileinfowrapper');
		me.selectProrfileCard(0);
		me.updateTopToolBar(true,profileInfo);
		me.updateBottomToolBar(false);
		me.updateProfileInfo();
		me.selectMenuItem(null);
	},
	updateProfileInfo:function(){
		var me = this,
			user = me.runtime.getUser(),
			name = user.firstName;
			
		mainprofilewrapper=Ext.ComponentQuery.query('profileinfowrapper #mainprofilewrapper')[0],
		userinfo=mainprofilewrapper.down('userinfo');
		name = (!Ext.isEmpty(user.lastName))?name+' '+user.lastName:name;
		userinfo.down('#name').setValue(name);
		userinfo.down('#gender').setValue(user.gender);
		userinfo.down('#email').setValue(user.email);
		userinfo.down('#jobTitle').setValue(user.jobTitle);
		userinfo.down('#role').setValue(user.role);
	},
	onManageUsers:function(){
		this.selectCard('users');
	},
	onLogout:function(){
		var me=this;
		Helper.deleteCookie("authorization");
		Helper.deleteCookie("userinfo");
		me.changeViewportCard(0);
	},
	onClickEditProfile:function(){
		var me = this,
			mainprofilewrapper = Ext.ComponentQuery.query('profileinfowrapper #mainprofilewrapper')[0],
			userinfo = mainprofilewrapper.down('useredit');
			
		userinfo.getForm().setValues(me.runtime.getUser());
		me.selectProrfileCard(1);
		me.updateTopToolBar(false);
		me.updateBottomToolBar(true);
	},
	onClickChangePassword:function(){
		var me = this;
		me.selectProrfileCard(2);
		me.updateTopToolBar(false,changedPassword);
		me.updateBottomToolBar(true);
	},
	selectProrfileCard:function(index){
		var mainprofilewrapper = Ext.ComponentQuery.query('profileinfowrapper #mainprofilewrapper')[0];
		mainprofilewrapper.getLayout().setActiveItem(index);
	},
	updateTopToolBar:function(flag,title){
		var topToolbar=Ext.ComponentQuery.query('profileinfowrapper #toptoolbar')[0];
		topToolbar.down('#changepasswordbtn').setVisible(flag);
		topToolbar.down('#editbutton').setVisible(flag);
		if(!Ext.isEmpty(title)){
			topToolbar.updateTitle(title);
		}
	},
	updateBottomToolBar:function(flag){
		var bottomToolbar = Ext.ComponentQuery.query('profileinfowrapper #bottomtoolbar')[0];
		bottomToolbar.down('#cancel').setVisible(flag);
		bottomToolbar.down('#save').setVisible(flag);
	},
	onClickSaveProfile:function(cmp){
		var me = this,
			user = me.runtime.getUser(),
			id = user.id,
			activeForm = mainprofilewrapper=Ext.ComponentQuery.query('profileinfowrapper #mainprofilewrapper')[0].getLayout().getActiveItem();
			
		Ext.getBody().mask(pleaseWait);
		if(activeForm.xtype == 'useredit' || activeForm.xtype == 'changepassword'){
		    Ext.Ajax.request({
				method: 'PUT',
				type : 'rest',
				jsonData : activeForm.getValues(),
				url: Settings.getBaseUserUrl()+'/'+id,
				headers:{"Authorization" : "Basic YWRtaW46aW5kaWdvMQ==" },
				scope: me,
				success: function (res) {
					Ext.getBody().unmask();
					var userInfo=Ext.decode(res.responseText);
					me.runtime.setUser(userInfo);
					me.updateHeaderUserName();
					Helper.setCookie("userinfo",JSON.stringify(userInfo),30);
					me.selectProrfileCard(0);
					me.updateTopToolBar(true,profileInfo);
					me.updateBottomToolBar(false);
					me.updateProfileInfo();
					var message =(activeForm.xtype=='useredit')?personalInformation:password;
					message=message+savedSuccessfully;
					Helper.fadeoutMessage('Success',message);
				},
				failure: function (rsp) {
					Ext.getBody().unmask();
					Ext.Msg.alert(weFacedError+"save information",rsp.responseText,null,me,null);
					return;
				}
			});    
		}
	},
	onClickCancelProfile:function(cmp){
		var me = this;
		me.selectProrfileCard(0);
		me.updateTopToolBar(true,profileInfo);
		me.updateBottomToolBar(false);
	},
	selectMenuItem:function(xtype){
		var cmp=Ext.ComponentQuery.query('viewport canwas mainmenu')[0],
			store = cmp.getStore(),
			rec = store.findRecord('xtype', xtype);
		
		rec ? cmp.getSelectionModel().select(rec) : cmp.getSelectionModel().deselectAll();
	},
	loadStores:function(){
		//Ext.getStore('OrderCharts').load();
		Ext.getStore('HomePageOders').load();
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
	}  
});  