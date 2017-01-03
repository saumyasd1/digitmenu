Ext.define('AOC.view.email.EmailManagement',{
	extend : 'Ext.Container',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.email.EmailManagementGrid'],
	alias : 'widget.emailmanagement',
	itemId : 'emailmanagementitemId',
	layout :'fit', 
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
				itemId:'emailPanel',
				collapsible :false,
				activeItem: 0,
				hidden:false,
    			items:[
					{
						xtype:'emailmanagementgrid',
						itemId:'EmailMangementitemId'
					},
					{
						xtype:'viewmail',
						itemId: 'viewMailItemId'
					}
    			]
    		}
		]
	}
});