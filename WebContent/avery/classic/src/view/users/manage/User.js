Ext.define('AOC.view.users.manage.User', {
	extend : 'Ext.Container',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.users.manage.UserGrid'],
	alias : 'widget.users',
	itemId : 'usersitemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			items : [ {
    			xtype : 'container',
    			flex : 1.8,
    			layout:'card',
				collapsible :false,
				activeItem: 0,
				hidden:false,
    			items:[{	
    				xtype:'usersgrid'
    				}
    			]
    		}]
	 	});
	 	this.callParent(arguments);
	}
});