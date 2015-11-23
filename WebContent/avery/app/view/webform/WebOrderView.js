Ext.define('AOC.view.webform.WebOrderView', {
	extend : 'Ext.panel.Panel',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.webform.WebOrderPage'],
	alias : 'widget.weborderview',
	itemId : 'webOrderViewItemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			border:'4 4 4 4',
			 layout: {
		        type: 'vbox',
		        align: 'stretch'
		    },
			items : [{
		 				xtype:'panel',
		 				flex:1,
		 				layout:'fit',
		 				items:[{
							xtype:'weborderpage',
						    flex:1
						}]
					}],
			dockedItems: [{
			    xtype: 'basetoolbar',
			    dock: 'top',
			    items: [{
			    	xtype : 'tbtext',
			    	text : '<div style="color:"><b>New Web Orders / Fix & Re-submit</b></div>'
					}]
			}]
	 	});
	 	this.callParent(arguments);
	}
});
