Ext.define('AOC.view.webform.WebOrderView', {
	extend : 'Ext.panel.Panel',
	requires : [
       'AOC.view.base.BaseToolbar',
       'AOC.view.webform.AttachmentInfoGrid',
       'AOC.view.webform.WebOrderForm',
       'AOC.view.webform.WebFormController'
	],
	alias : 'widget.weborderview',
	controller:'webformcontroller',
	itemId : 'webOrderViewItemId',
	layout:'border',
	initComponent : function() {
	    var me = this;
		me.items = me.buildItems();
		
		me.callParent(arguments);
	},
	dockedItems:[
	    {
	    	xtype:'toolbar',
	    	dock:'top',
	    	height:35,
	    	items:[
				{
					xtype:'tbtext',
					text:'New Web Orders',
					itemId:'weborderlabel',
					style:AOC.config.Settings.config.tabHeaderTitleStyle
				}
	    	]
	    }
	],
	buttons:[
		{
			text:'Back',
			itemId:'backButtonimage',
			iconCls:'x-fa fa-arrow-left',
			handler:'backButton',
			hidden:true
		},
	    '->',
		{
		   itemId: 'cancel',
		   iconCls:'x-fa fa-times',
		   text:AOCLit.Cancel,
		   handler: 'onCancelBtnClick'
		},
		{
		   text:AOCLit.Save,
		   iconCls:'x-fa fa-save',
		   itemId: 'save',
		   handler:'onSaveBtnClick'
		}
	],
	buildItems:function(){
		return [
			{
				xtype:'weborderform',
				reference:'webform',
				region:'north',
				height:240,
				style:'border-top:solid 1px #cecece;background-color:#fff;'
			},
			{
				xtype:'attachmentinfoGrid',
				reference:'webOrderAttachmentInfoGrid',
				style:AOC.config.Settings.config.defaultBorderStyle,
				region:'center'
			}
		];
	},
	updateHeaderLabel:function(label){
	    var cmp = this.down('#weborderlabel');
	    cmp.setText(label);
	}
});
