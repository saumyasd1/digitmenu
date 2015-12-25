Ext.define('AOC.controller.MenuController', {
	extend :'Ext.app.Controller',
	alias: 'controller.menuController',
	requires:['AOC.view.ux.Callout'],
	stores:['Sections','MenuStore','PartnerManagementStore','AddressStore','OrderQueueStore','HomePageOders'],
	models:['MenuModel'],
	views : ['base.BaseToolbar','Viewport'],
	refs : [{
		selector : 'viewport #toolbarviewitemid',
		ref : 'toolbar'
		},
		{
			selector : 'viewport',
			ref : 'viewport'
		},
		{
			selector : 'viewport canwas maincontainer',
			ref : 'mainCard'
		},
		{
		   	selector : 'viewport #AOCContainer',
	 	 	ref : 'mainContainer'
	    },
	    {
		   	selector : 'viewport #OrderQueueGridItemId',
	 	 	ref : 'orderQueueGrid'
	    },
	    {
		   	selector : 'viewport #PartnerMangementitemId',
	 	 	ref : 'partnerMangementgrid'
	    },
	    {
		   	selector : 'viewport #AddressManageGriditemId',
	 	 	ref : 'addressManagegrid'
	    },
	    {
		   	selector : 'viewport #archiveManageGriditemId',
	 	 	ref : 'archiveManagegrid'
	    }
	 ],
	 menuInstructions : AOC.config.MenuInstructions,
	 runTime : AOC.config.Runtime,
	 init : function(){
		this.control({
			 '#toolbarviewitemid[data]':{
	            click : this.onClickToolbarButton
			 },
			 '#headeruserbutton > menuitem[action=openPopupForHeader]':{
	                click : this.openPopupForHeader
	         },
	         'viewport canwas mainmenu' : {
	                clickmenu : this.onClickMainMenu
	            },
	         'viewport aocheader' : {
	                clickprofilemenu : this.onClickProfileMenu
	            }
		}); 
		this.profileMenuTpl = this.buildMenuTpl();
	},
	openPopupForHeader : function(btn) {
		 var data = btn.data,
        btntext = btn.text;
    if (data == 'Logout') {
    	Ext.util.Cookies.clear("lastService");
    	Ext.util.Cookies.clear("classicMenu");
    	
        Ext.Ajax.request({
            url:'/adeptia/logout.jsp',
            success:function (response, opts) {
                location.reload();
            }
        });
    }
	},
	onClickToolbarButton : function(btn){
		var instructions = this.getInstructions(btn.service);
	    	this.runTime.setActiveButton(btn.service);
	        // call the buttons function
	    	if(btn.service!='AuditReport')
	         this.callButtonFunction(btn,instructions);
	},
	getInstructions : function(service){
	    var buttonInsMethod = 'get' + service.charAt(0).toUpperCase() + service.slice(1);
	    var   instructions="";
	    if(this.menuInstructions[buttonInsMethod]!=undefined)
	     instructions = this.menuInstructions[buttonInsMethod]();
	    else
	    	instructions=this.menuInstructions['home']();
	    return instructions;
	},
	callButtonFunction : function(btn, instructions){ 
	    // call the needed controller / function for this button
	    if (instructions.controller && instructions.fnc){
	        this.getController(instructions.controller)[instructions.fnc](btn,instructions);
	    }
	},
	onLoadMenuBar : function(store, records, success, operation, eopts)
	{
		var menuController=myAppGlobal.getController('MenuController');
		var menuView=menuController.getToolbar();
		   if(menuView){
		    menuView.getEl().dom.style.webkitBoxShadow = '0 0 2px 2px #888';
		    menuView.getEl().dom.style.boxShadow = '0 0 2px 2px #888';
		   }
		   var menubar = "",
	       adminAddFlag,
	       service,
	       parentService,
	       parentServiceNameArr = [],
	       data,
	       button,
	       align,
	       leftButton = [],
	       rightButton = [];
	   store.each(function (record, index, length) {
	               adminAddFlag = true;
	               service = record.data.name;
	               align = record.data.align;
	               parentService = record.data.parentservice;
	               parentServiceNameArr = parentService.split("/");
	               if (parentServiceNameArr[0] == 'AOC App' || parentServiceNameArr[0] == 'AOC APP')
	            	   menubar = menuController.getToolbar();
	               	 if (parentService != null && parentService != "") {
	               		// add directly to the toolbar
	               		data = service + "::" + record.data.displayname;
	               		if (adminAddFlag){
	               			if(align == 'Left' || align == 'left' || align == 'LEFT'){
	               				leftButton.push(menuController.createButton(menubar, record, data, service));
	               			}
	               			if(align == 'Right' || align == 'right' || align == 'RIGHT'){
	               				rightButton.push(menuController.createButton(menubar, record, data, service));
	               			}
	               		}
	               	}
	   },this);
	   menubar.add(leftButton);
	   menubar.add('->');
	   menubar.add(rightButton);
	   menuController.getMainContainer().getLayout().setActiveItem(5);
	  },
	  createButton : function(addTo, record, data, service){
	      // add the button
		  var me=this;
	      var btn = {
	          text : record.data.displayname,
	          service : service,
	          data : data,
	          handler:function(obj){
	    	  me.onClickToolbarButton(obj);
	      }
	      };
	      return btn;
	  },
	  loadHomePage : function(){
		  this.getMainContainer().getLayout().setActiveItem(5);
	  },
	  loadPartnerManagement: function(){
		  var PartnerManagementStore=this.getPartnerManagementStoreStore();
		  this.getPartnerMangementgrid().bindStore(PartnerManagementStore);
		  this.runTime.setActiveGrid(this.getPartnerMangementgrid());
		  this.getPartnerMangementgrid().down('#pagingtoolbar').bindStore(PartnerManagementStore);
		  this.getMainContainer().getLayout().setActiveItem(1);
	  },
	  loadOrderQueueScreen: function(){
		  var OrderQueueStore=this.getOrderQueueStoreStore();
		  this.getOrderQueueGrid().reconfigure(OrderQueueStore);
		  this.runTime.setActiveGrid(this.getOrderQueueGrid());
		  this.getOrderQueueGrid().down('#pagingtoolbar').bindStore(OrderQueueStore);
		  this.getMainContainer().getLayout().setActiveItem(0);
	  },
	  loadWebFormScreen: function(){
		  this.getMainContainer().getLayout().setActiveItem(3);
	  },
	  loadAddressManage: function(){
		  var AddressStore=this.getAddressStoreStore();
		  this.getAddressManagegrid().bindStore(AddressStore);
		  this.runTime.setActiveGrid(this.getAddressManagegrid());
		  this.getAddressManagegrid().down('#pagingtoolbar').bindStore(AddressStore);
		  AddressStore.load();
		  this.getMainContainer().getLayout().setActiveItem(2);
	  },
	  loadArchiveManage: function(){
		  //var ArchiveStore=this.getArchiveStoreStore();
		  //this.getArchiveManagegrid().bindStore(ArchiveStore);
		  //this.runTime.setActiveGrid(this.getArchiveManagegrid());
		  //debugger;
		  //this.getArchiveManagegrid().down('#pagingtoolbar').bindStore(ArchiveStore);
		 // ArchiveStore.load();
		  this.getMainContainer().getLayout().setActiveItem(4);
	  },
	  onClickMainMenu:function(cmp, rec){
	      var me=this,
	      xtype = rec.get('xtype'),
	      cardLayout =me.getMainCard().getLayout(),
	      section= Ext.ComponentQuery.query(xtype)[0],
	      activeItem=cardLayout.getActiveItem();
	      if(activeItem && activeItem.xtype==xtype){
		  return;
	      }else{
		  if (Ext.isEmpty(section)){
		            section = Ext.widget(xtype);
		    }
		  if (!Ext.isEmpty(section)){
		    cardLayout.setActiveItem(section) ; 
		  }
	      }
	  },
	  onClickProfileMenu:function(el){
	      var me=this;
	      var callout = Ext.widget('callout', {
  	          cls                  : 'white more-menu-item-callout extra',
  	          html                 : me.buildMenuTpl.apply("{}"),
  	          target               : el,
  	          calloutArrowLocation : 'top-right',
  	          relativePosition     : 't-b',
  	          relativeOffsets      : [-57,23],
  	          dismissDelay         : 0 
  	          });
	      callout.show();   
	  },
	  buildMenuTpl : function(){
	    	  var me=this;
	    	 return Ext.create('Ext.XTemplate',
	    	      '<div style="width: 140px !important;border-bottom: none !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="profileinfo"">Profile Information</div>',
	              '<tpl if="this.isAdmin(values)">',
	              '<div style="width: 140px !important;border-bottom: none !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="profileinfo"">Manage Users</div>',
	              '</tpl>',
	              '<div style="width: 140px !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="logout"">Logout</div>',
	    	     '</tpl>',
	               {
	              	isAdmin : function(v){
	              	        return  true;
	              	}
	              }
	          );
	      }
});  