Ext.define('AOC.view.taskmanager.TaskManager',{
	extend : 'Ext.Container',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.taskmanager.TaskManagerGrid'],
	alias : 'widget.taskmanager',
	itemId : 'taskManageritemId',
	layout:'fit',
	border:'4 4 4 4',
	initComponent : function() {
		this.items = this.buildItems();
	 	this.callParent(arguments);
	},
	buildItems:function(){
		return [
			{
    			xtype : 'container',
    			flex : 1.8,
    			layout:'card',
				itemId:'taskManagerPanel',
				activeItem: 0,
    			items:[
					{
						xtype:'taskManagergrid',
						itemId:'TaskManagerGriditemId'
					},
					{
						xtype:'viewmail',
						itemId: 'viewMailItemId'
					}
				]
			}
		];
	}
});