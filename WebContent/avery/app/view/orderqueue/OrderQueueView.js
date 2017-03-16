Ext.define('AOC.view.orderqueue.OrderQueueView', {
	extend : 'Ext.Container',
	requires : ['AOC.view.orderqueue.OrderQueueGrid'],
	alias : 'widget.orderqueueview',
	itemId : 'orderQueueViewItemId',
	layout:'card',
	activeItem:0,
	initComponent : function() {
		Ext.apply(this, {
			
	        items:[
                 {
		    	   xtype:'orderqueuegrid',
		    	   reference:'orderQueueGrid'
                 }
             ]
	 	});
	 	this.callParent(arguments);
	}
});
