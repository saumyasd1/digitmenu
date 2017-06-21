Ext.define('AOC.view.viewmail.ViewMail', { 
	extend : 'Ext.panel.Panel',
	requires : ['AOC.view.viewmail.EmailAttachmentInfoGrid','AOC.view.viewmail.ViewMailForm'],
	alias : 'widget.viewmail',
	controller:'viewMailController',
	itemId : 'viewMailItemId',
	bodyStyle:'background-color:#fff;',
	layout:{
		type:'border'
	},
	
	initComponent:function(){
		var me = this;
		me.items = me.buildItems();
		me.tbar = {
			height:AOC.config.Settings.config.defaultTbarHeight,
			items :me.buildTBar()
		}
		me.buttons = me.buildButtons();
		me.callParent(arguments);
	},
	listeners:{
		show:'onViewShow'
	},
	
	buildTBar:function(){
		return [
			{
				xtype:'tbtext',
				text:'View Mail Detail',
				style:AOC.config.Settings.config.tabHeaderTitleStyle
			}
		]
	},
	buildButtons:function(){
		return [
			{
				text:'Back',
				handler:'backButton'
			},
			'->',
			{
			   margin: '0 10 0 10',
			   text: 'Save',
			   reference:'saveEmailAttachmentBtn',
			   itemId: 'saveAttachment',
			   disabled:true,
			   handler: 'onSaveBtnClicked'
			},
			{
			   margin  : '0 10 0 10',
			   text    : 'Assign CSR',
			   reference:'assignCSRBtn',
			   itemId  : 'assignCSRBtn',
			   hidden:true,
			   handler : 'onAssignCSRBtnClicked'
			},
			{
			   margin  : '0 10 0 0',
			   itemId  : 'downloadAttachments',
			   text    : 'Download Attachment(s)',
			   reference:'downLoadAttachmentBtn',
			   handler : 'onDownloadAttachmentBtnClick'
			},
			{
			   itemId  : 'processOrderBtn',
			   text    : 'Process Order',
			   reference:'processOrderBtn',
			   disabled: true,
			   handler : 'onProcessOrderBtnClicked'
			}
		];
	},
	buildItems:function(){
		return [
			 {
				 xtype:'viewmailform',
				 reference:'viewMailForm',
				 region:'north',
				 height:155,
				 scrollable:true,
				 margin:'0 10 0 10',
				 style:'border-top:solid 1px #cecece;'
			},
			{
				 xtype:'emailattachmentinfoGrid',
				 margin:'0 1 0 1',
				 reference:'emailAttachmentInfoGrid',
				 scrollable:true,
				 frame:true,
				 region:'center'
			 }
		]
	},
	
	updateHeaderLabel:function(label){
	    var cmp = this.down('#weborderlabel');
	    cmp.update('<div  style="color: #333f49;font: 300 13px/16px helvetica, arial, verdana, sans-serif;"><b>'+label+'</b></div>')
	}
});
