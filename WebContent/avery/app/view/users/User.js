Ext.define('AOC.view.users.User', {
	extend : 'Ext.panel.Panel',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.users.UserGrid'],
	alias : 'widget.users',
	itemId : 'usersitemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			border:'4 4 4 4',	
			items : [ {
    			xtype : 'panel',
    			flex : 1.8,
    			layout:'card',
				itemId:'partnerPanel',
				collapsible :false,
				activeItem: 0,
				hidden:false,
    			items:[{
    				xtype:'usersgrid',
					CartId:1
    			}
    			]
    		}]
	 	});
	 	this.callParent(arguments);
	}
});