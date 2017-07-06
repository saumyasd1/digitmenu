Ext.define('AOC.view.orderqueue.OrderQueueView', {
	extend : 'Ext.Container',
	requires : ['AOC.view.orderqueue.OrderQueueGrid'],
	alias : 'widget.orderqueueview',
	itemId : 'orderQueueViewItemId',
	layout:'card',
	activeItem:0,
	items:[
       {
    	   xtype:'orderqueuegrid',
    	   reference:'orderQueueGrid'
       }
    ]
});
