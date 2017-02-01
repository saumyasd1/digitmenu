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
		me.bbar = me.buildBBar();
		
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
	buildBBar:function(){
		return [
			{
				xtype:'whitebutton',
				text:'Back',
				itemId:'backButtonimage',
				handler:'backButton',
				hidden:true
			},
		    '->',
			{
			   xtype: 'plainbutton',
			   itemId: 'cancel',
			   text:AOCLit.Cancel,
			   handler: 'onCancelBtnClick'
			},
			{
			   xtype: 'whitebutton',
			   margin: '0 10 0 10',
			   text:AOCLit.Save,
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
				style:'border-top:solid 1px #cecece;background-color:#fff;',
				scrollable:true
			},
			{
				xtype:'attachmentinfoGrid',
				reference:'webOrderAttachmentInfoGrid',
				style:AOC.config.Settings.config.defaultBorderStyle,
				region:'south',
				height:200
			}
		]
	},
	updateHeaderLabel:function(label){
	    var cmp = this.down('#weborderlabel');
	    cmp.setText(label);
	}
});
