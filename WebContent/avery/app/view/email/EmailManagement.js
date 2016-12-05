Ext.define('AOC.view.email.EmailManagement',{
	extend : 'Ext.Container',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.email.EmailManagementGrid'],
	alias : 'widget.emailmanagement',
	itemId : 'emailmanagementitemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			border:'4 4 4 4',	
			items : [ {
    			xtype : 'container',
    			flex : 1.8,
    			layout:'card',
				itemId:'emailPanel',
				collapsible :false,
				activeItem: 0,
				hidden:false,
    			items:[{
    				xtype:'emailmanagementgrid',
					CartId:1
    			}]
    		}]
	 	});
	 	this.callParent(arguments);
	}
});