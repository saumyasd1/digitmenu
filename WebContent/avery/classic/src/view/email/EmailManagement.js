Ext.define('AOC.view.email.EmailManagement',{
	extend : 'Ext.Container',
	requires : [
         'AOC.view.email.EmailManagementGrid',
         'AOC.view.viewmail.ViewMail'
	],
	alias: 'widget.emailmanagement',
	itemId: 'emailManagementItemId',
	layout:'card',
	activeItem: 0,
	deferredRender:true,
	
	initComponent : function() {
		this.items = this.buildItems();
	 	this.callParent(arguments);
	},
	buildItems:function(){
		return [
			{
				xtype:'emailmanagementgrid',
				reference:'emailManagementGrid'
			},
			{
				xtype:'viewmail',
				reference:'viewMailContainer'
			}
		]
	}
});