Ext.define('AOC.view.taskmanager.TaskManager',{
	extend : 'Ext.Container',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.taskmanager.TaskManagerGrid'],
	alias : 'widget.taskmanager',
	itemId : 'taskManagerItemId',
	layout:'card',
	activeItem:0,
	border:'4 4 4 4',
	initComponent : function() {
		this.items = this.buildItems();
	 	this.callParent(arguments);
	},
	buildItems:function(){
		return [
			{
				xtype:'taskmanagergrid'
			},
			{
				xtype:'viewmail'
			}
		];
	}
});