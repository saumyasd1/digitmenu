Ext.define('AOC.view.email.EmailManagement',{
	extend : 'Ext.Container',
	requires : [
         'AOC.view.base.BaseToolbar',
         'AOC.view.email.EmailManagementGrid',
         'AOC.view.viewmail.ViewMail'
	],
	alias : 'widget.emailmanagement',
	itemId : 'emailManagementItemId',
	layout :'card',
	activeItem: 0,
	border:'4 4 4 4',
	
	initComponent : function() {
		this.items = this.buildItems();
	 	this.callParent(arguments);
	},
	buildItems:function(){
		return [
			{
				xtype:'emailmanagementgrid'
			},
			{
				xtype:'viewmail',
				reference:'viewMailContainer'
			}
		]
	}
});