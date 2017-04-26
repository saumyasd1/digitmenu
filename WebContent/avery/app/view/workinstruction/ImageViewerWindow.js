Ext.define('AOC.view.workinstruction.ImageViewerWindow', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.imageviewerwindow',
	
	requires: ['Ext.window.MessageBox'],
	
	layout:'fit',
	title:'Image Preview',
	
	initComponent:function(){
		var me = this;
		Ext.apply(me,{
			items:me.buildItems(),
			width: Ext.getBody().getWidth() - 100,
			height:Ext.getBody().getHeight() -50,
			buttons:me.getButtons()
		});
		me.callParent(arguments);
	},
	buildItems :function(){
		var me = this;
		return {
			xtype:'image',
			src:me.fileSrc,
			reference:'imagePreview'
		};
	},
	getButtons :function(){
		return [ 
			{
				text : 'Close',
				scope:this,
				handler:function(){
					this.close();
				}
			}
		];	
	}
});
