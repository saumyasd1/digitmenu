Ext.define('AOC.view.orderqueue.OrderQueueAttachmentWindow', {
	extend : 'AOC.view.base.NewBaseWindow',
	alias : 'widget.orderqueueattachmentwin',
	itemId : 'orderQueueAttachmentWin',
	reference:'orderQueueAttachmentWin',
	controller : 'orderqueue',
	
	layout:'fit',
	width: 400,
	height:400,
	title:'Additional File Attachment',
	initComponent:function(){
		var me = this;
		me.items = me.buildItems();
		
		me.callParent(arguments);
	},
	afterRender:function(){
		var me = this;
		me.callParent(arguments);
		this.mask(AOCLit.pleaseWaitTitle);
		var	grid = me.lookupReference('attachmentGrid'),
			store = new Ext.data.JsonStore({
				fields:['id','fileName', 'filePath'],
				proxy : {
					type : 'rest',
					url : applicationContext+'/rest/orderattachements/additionalfiles/'+ me.recordId,
					reader:{
						type:'json', 
						rootProperty: 'additionalfiles',
					}
				},
				autoLoad:true
			});
		
		grid.bindStore(store);
		this.unmask();
	},
	buildItems :function(){
		var me = this;
		return [
		    {
		    	xtype:'grid',
		    	reference:'attachmentGrid',
		    	reserveScrollbar:true,
		        columnLines:true,
		        border:true,
		        emptyText: AOCLit.noContentTypeDispMsg,
		        selType: 'checkboxmodel',
		        reserveScrollbar:true,
		        listeners:{
		        	cellclick:'onAttachmentGridCellClick'
		        },
		        bbar:me.buildBbar(),
		    	columns:[
					{
						text : 'File Name',
						flex :1.5,
						dataIndex:'fileName',
						name: 'fileName',
						resizable:false,
						sortable:false,
						resizable:false,
						renderer: function (value) {
							return '<a class="emailAttachmentLink" href="#">'+ value +'</a>';
						}
					}
		    	]
		    }
		]
	},
	buildBbar :function(){
		return [ 
		     '->',
			{
				text : 'Download Attachments',
				ui:'blue',
				listeners : {
					click  : 'onDownloadAttachmentBtnClick'
				}
			}
		]	
	}
});
