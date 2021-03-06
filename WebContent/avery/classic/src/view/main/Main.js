/**
 * Created By:Amit Kumar
 *
 */
Ext.define('AOC.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.window.MessageBox',
        'AOC.view.main.MainController',
        
        'AOC.view.home.Wrapper',
        'AOC.view.address.AddressManage'
    ],

    titleRotation: 0,
    tabRotation: 0,
    activeItem:0,
    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'top'
        }
    },
    listeners:{
    	tabchange:'onTabChange',
    	render:'onTabRenderer',
    	focus:function(tabpanel, event){
    		event.event.stopEvent();
    	},
    	focusenter:function(tabpanel, event){
    		event.event.stopEvent();
    	}
    },

    defaults: {
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            },
            listeners: {
                click: 'onTabClick'
            }
        }
    },
    
    items:[
       {
    	  title:'HOME',
    	  iconCls:'fa fa-home',
    	  layout:'fit',
    	  itemId:'home',
    	  listType:'orderQueueStatusList',
    	  items:[
    	     {
    	    	 xtype:'homewrapper',
    	    	 reference:'homewrapper'
    	     }
    	  ]
       }, {
    	  title:'TASK MANAGER',
    	  iconCls:'fa fa-tasks',
    	  layout:'fit',
    	  itemId:'taskmanager',
    	  listType:'taskMangerGrid',
    	  items:[
    	     {
    	    	 xtype:'taskmanager'
    	     }
    	  ]
       }, {
    	  title:'EMAIL QUEUE',
    	  iconCls:'fa fa-envelope',
    	  layout:'fit',
    	  itemId:'emailQueue',
    	  listType:'emailManagementGrid',
    	  items:[
    	     {
    	    	 xtype:'emailmanagement'
    	     }
    	  ]
       }, {
    	  title:'ORDER QUEUE',
    	  iconCls:'fa fa-calendar-o',
    	  layout:'fit',
    	  itemId:'orderQueue',
    	  listType:'orderQueueGrid',
    	  items:[
    	     {
    	    	 xtype:'orderqueueview'
    	     }
    	  ]
       }, {
    	  title:'WEB ORDER',
    	  iconCls:'fa fa-globe',
    	  layout:'fit',
    	  itemId:'webOrder',
    	  listType:'webOrderView',
    	  items:[
    	     {
    	    	 xtype:'weborderview',
    	    	 reference:'webOrderView'
    	     }
    	  ]
       }, {
    	  title:'PARTNER',
    	  iconCls:'fa fa-users',
    	  layout:'fit',
    	  itemId:'partner',
    	  listType:'partnerProductLineGrid',
    	  items:[
    	     {
    	    	 xtype:'partnermanagement'
    	     }
    	  ]
       }, {
    	  title:'ADDRESS',
    	  iconCls:'x-fa fa-address-card-o',
    	  layout:'fit',
    	  itemId:'address',
    	  listType:'addressManagerGrid',
    	  items:[
    	     {
    	    	 xtype:'addressmanage'
    	     }
    	  ]
       },
       {
     	  title:'LOCAL ITEM LOOKUP',
     	  iconCls:'fa fa-map-signs',
     	  layout:'fit',
     	  itemId:'localItemLookUp',
     	  listType:'localItemLookupGrid',
     	  items:[
     	     {
     	    	 xtype:'localitemlookup'
     	     }
     	  ]
        }
    ] 
});

