Ext.define('AOC.view.orderqueue.OrderQueueView', {
	extend : 'Ext.panel.Panel',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.orderqueue.OrderQueueGrid'],
	alias : 'widget.orderqueueview',
	itemId : 'orderQueueViewItemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			border:'4 4 4 4',
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
		 				items:[{
							xtype:'orderqueuegrid',
						    flex:1
						}]
					}],
			dockedItems: [{
			    xtype: 'basetoolbar',
			    dock: 'top',
			    items: [{
			    	xtype : 'tbtext',
			    	itemId : 'bulkUpdateItemId',
			    	text : '<div style="color:"><b></b></div>'
					}]
			}]
	 	});
	 	this.callParent(arguments);
	}
});
