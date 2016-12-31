Ext.define('AOC.view.viewmail.ViewMail', { 
	extend : 'Ext.panel.Panel',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.viewmail.EmailAttachmentInfoGrid','AOC.view.viewmail.ViewMailForm'],
	alias : 'widget.viewmail',
	controller:'viewMailController',
	itemId : 'viewMailItemId',
	layout:{
		type:'border'
	},
	
	initComponent:function(){
		var me = this;
		me.items = me.buildItems();
		me.tbar = me.buildTBar();
		me.bbar = me.buildBBar();
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
				style:'color: #333f49;font-weight:bold;font-size:15px;'
			}
		]
	},
	buildBBar:function(){
		return [
			{
				xtype:'whitebutton',
				text:'Back',
				handler:'backButton'
			},
			'->',
			{
			   xtype   : 'whitebutton',
			   margin  : '0 10 0 10',
			   text    : 'Save',
			   itemId  : 'saveAttachment',
			   handler : 'onSaveBtnClicked'
			},
			{
			   xtype   : 'whitebutton',
			   margin  : '0 10 0 0',
			   itemId  : 'downloadAttachments',
			   text    : 'Download Attachment(s)'
			   //handler : 'CancelDetails'
			},
			{
			   xtype   : 'whitebutton',
			   itemId  : 'processOrderBtn',
			   text    : 'Process Order',
			   disabled: false,
			   handler : 'onProcessOrderBtnClicked'
			}
		]
	},
	buildItems:function(){
		return [
			 {
				 xtype:'viewmailform',
				 reference:'webform',
				 region:'north',
				 height:180
			},
			{
				 xtype:'emailattachmentinfoGrid',
				 scrollable:true,
				 region:'center'
			 }
		]
	},
	
	updateHeaderLabel:function(label){
	    var cmp = this.down('#weborderlabel');
	    cmp.update('<div  style="color: #333f49;font: 300 13px/16px helvetica, arial, verdana, sans-serif;"><b>'+label+'</b></div>')
	}
});
