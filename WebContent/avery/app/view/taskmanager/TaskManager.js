Ext.define('AOC.view.taskmanager.TaskManager',{
	extend : 'Ext.Container',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.taskmanager.TaskManagerGrid'],
	alias : 'widget.taskmanager',
	itemId : 'taskManageritemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			border:'4 4 4 4',	
			items : [ {
    			xtype : 'container',
    			flex : 1.8,
    			layout:'card',
				itemId:'taskManagerPanel',
				collapsible :false,
				
				activeItem: 0,
				hidden:false,
    			items:[{
    				xtype:'taskManagergrid',
					CartId:1,
					itemId:'TaskManagerGriditemId'
    			},
    			{
    				xtype:'viewmail',
    				CartId:1,
					itemId: 'viewMailItemId'
					
    			}]
    		}]
	 	});
	 	this.callParent(arguments);
	}
});