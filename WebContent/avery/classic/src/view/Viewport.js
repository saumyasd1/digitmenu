/**
 * The main application viewport, which displays the whole application
 * 
 * @extends  Ext.Viewport
 */
Ext.define('AOC.view.Viewport', {
	extend : 'Ext.container.Viewport',
	itemId : 'viewportitemid',
	requires : [
		'AOC.view.AOCLogin',
		'AOC.view.AOCHeader'
	],
	layout:{
		type:'card',
		deferredRender:true
	},
	controller: 'main',
    viewModel: 'main',
	initComponent: function(){
		this.items = this.buildItems();
		this.callParent(arguments);
	},
	buildItems:function(){
		return [
			{
				 xtype: 'aoclogin',
				 style: AOC.config.Settings.getBaseBackgroundColor()
			},
			{
				xtype : 'container',
				layout : {
					type : 'border'
				},
				items : [
					{
						region : 'north',
						xtype : 'aocheader'
					},
					{
						region : 'center',
						xtype : 'app-main'
					}
				]
			}
		]
	}
});
	
