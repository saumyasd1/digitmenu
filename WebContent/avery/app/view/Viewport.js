/**
 * The main application viewport, which displays the whole application
 * 
 * @extends Ext.Viewport
 */
Ext.define('AOC.view.Viewport', {
	extend : 'Ext.container.Viewport',
	itemId : 'viewportitemid',
	requires : ['AOC.view.AOCLogin','AOC.view.AOCHeader','AOC.view.ToolbarView','AOC.view.orderqueue.OrderQueueView','AOC.view.partner.PartnerManagement','AOC.view.address.AddressManage','AOC.view.webform.WebOrderView','AOC.view.archive.ArchiveManage'],
	stores:[ 'PartnerManagementStore','AddressManageStore'],
	initComponent : function(){
		Ext.apply(this, {
			layout : {
				type : 'card',
			     deferredRender : true
			    },
			items : [
			         {
			             xtype : 'aocLogin'
			         },
			         {
			            xtype     : 'container',
			         	layout : {
							type : 'border'
						},
			             items     : [
					{
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
							   },
							   {
							       xtype : 'archivemanage',
							    	cls : 'adeptia-home-entity',
							    	 margins : '12 12 12 12'
							   }
						       ]
					}
								                     ]
								                 }
								             ]
								         })
								     	this.callParent(arguments);
	}
		});
	
