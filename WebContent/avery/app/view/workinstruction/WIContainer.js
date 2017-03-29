Ext.define('AOC.view.workinstruction.WIContainer',{
	extend : 'Ext.Container',
	requires : [
         'AOC.view.workinstruction.WIGrid',
         'AOC.view.workinstruction.WIForm',
         'AOC.view.workinstruction.WIContainerController'
	],
	alias : 'widget.wicontainer',
	itemId : 'wiContainer',
	layout :'card',
	activeItem: 0,
	border:'4 4 4 4',
	controller:'wicontainercontroller',
	initComponent : function() {
		this.items = this.buildItems();
	 	this.callParent(arguments);
	},
	buildItems:function(){
		return [
			{
				xtype:'wigrid',
				reference:'wiGrid'
			},
			{
				xtype:'wiformpanel',
				reference:'wiFormPanel'
			}
		]
	}
});