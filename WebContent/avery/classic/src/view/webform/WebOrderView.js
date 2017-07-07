Ext.define('AOC.view.webform.WebOrderView', {
	extend : 'Ext.panel.Panel',
	requires : [
       'AOC.view.base.BaseToolbar',
       'AOC.view.webform.AttachmentInfoGrid',
       'AOC.view.webform.WebOrderForm',
       'AOC.view.webform.WebFormController'
	],
	alias : 'widget.weborderview',
	controller:'webFormMain',
	itemId : 'webOrderViewItemId',
	layout:'border',
	initComponent : function() {
	    var me = this;
		me.items = me.buildItems();
		me.tbar = {
			height:AOC.config.Settings.config.defaultTbarHeight,
			items :me.buildTBar()
		}
		me.buttons = me.buildButtons();
		
		me.callParent(arguments);
	},
	buildTBar:function(){
		return [
			{
				xtype:'tbtext',
				text:'New Web Orders',
				itemId:'weborderlabel',
				style:AOC.config.Settings.config.tabHeaderTitleStyle
			}
		]
	},
	buildButtons:function(){
		return [
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
		]
	},
	buildItems:function(){
		return [
			{
				xtype:'weborderform',
				reference:'webform',
				region:'center',
				padding:10,
				style:'border-top:solid 1px #cecece;background-color:#fff;'
			},
			{
				xtype:'attachmentinfoGrid',
				reference:'webOrderAttachmentInfoGrid',
				style:AOC.config.Settings.config.defaultBorderStyle,
				region:'south',
				height:230
			}
		]
	},
	updateHeaderLabel:function(label){
	    var cmp = this.down('#weborderlabel');
	    cmp.setText(label);
	}
});
