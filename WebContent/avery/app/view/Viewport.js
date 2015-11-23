/**
 * The main application viewport, which displays the whole application
 * 
 * @extends Ext.Viewport
 */
Ext.define('AOC.view.Viewport', {
	extend : 'Ext.container.Viewport',
	itemId : 'viewportitemid',
	requires : ['AOC.view.AOCHeader','AOC.view.ToolbarView','AOC.view.orderqueue.OrderQueueView','AOC.view.partner.PartnerManagement','AOC.view.address.AddressManage','AOC.view.webform.WebOrderView'],
	stores:[ 'PartnerManagementStore','AddressManageStore'],
	initComponent : function(){
		Ext.apply(this, {
			layout : {
				type : 'border'
			},
			items : this.buildItems()
		});
		this.callParent(arguments);
	},
	
	buildItems : function()  {
		return [{
			region : 'north',
			xtype : 'aocheader'
		},
		{
			region : 'north',
			xtype : 'toolbarview',
			height:30,
	        itemId:'toolbarviewitemid'
		},
		{
		 	region : 'center',
		 	xtype:'container',
		 	layout : {
		 		type : 'card',
		 		deferredRender : true
		  	},
			activeItem : 0,
			itemId:'AOCContainer',
			items:[
			       {
			    	   xtype : 'orderqueueview' ,
			    	   cls : 'adeptia-home-entity',
			    	   margins : '12 12 12 12'
			       },
				   {
				       xtype : 'partnermanagement',
				    	cls : 'adeptia-home-entity',
				    	 margins : '12 12 12 12'
				   },
				   {
				       xtype : 'addressmanage',
				    	cls : 'adeptia-home-entity',
				    	 margins : '12 12 12 12'
				   },
				   {
				       xtype : 'weborderview',
				    	cls : 'adeptia-home-entity',
				    	 margins : '12 12 12 12'
				   }
			       ]
		}
	]}
});