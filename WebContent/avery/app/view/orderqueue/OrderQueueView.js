Ext.define('AOC.view.orderqueue.OrderQueueView', {
	extend : 'Ext.Container',
	requires : ['AOC.view.orderqueue.OrderQueueGrid'],
	alias : 'widget.orderqueueview',
	itemId : 'orderQueueViewItemId',
	initComponent : function() {
		Ext.apply(this, {
			 layout: {
		         type: 'vbox',
		         align: 'stretch'
		        },
			items : [{
		 				xtype:'container',
		 				flex:1,
		 				layout:'fit',
		 				layout:'card',
						collapsible :false,
						itemId : 'orderQueueViewItemId1',
						activeItem:0,
		 				items:[
	 				       {
	 				    	   xtype:'orderqueuegrid',
	 				    	   reference:'orderQueueGrid'
	 				       },
	 				       {
	 				    	   xtype:'orderlinecontainer',
	 				    	   reference:'orderLineContainer'
	 				       }
 				       ]
					}]
	 	});
	 	this.callParent(arguments);
	}
});
