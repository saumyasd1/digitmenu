Ext.define('AOC.controller.MenuController', {
	extend :'Ext.app.Controller',
	alias: 'controller.menuController',
	stores:['MenuStore','PartnerManagementStore','AddressStore','OrderQueueStore'],
	models:['MenuModel'],
	views : ['base.BaseToolbar','Viewport','AOCHome'],
	refs : [{
		selector : 'viewport #toolbarviewitemid',
		ref : 'toolbar'
		},
		{
			selector : 'viewport',
			ref : 'viewport'
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
	         }
		});           
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
	   menuController.getMainContainer().getLayout().setActiveItem(0);
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
		  this.getMainContainer().getLayout().setActiveItem(0);
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
	  }
})   