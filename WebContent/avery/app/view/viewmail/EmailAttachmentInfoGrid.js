Ext.define('AOC.view.viewmail.EmailAttachmentInfoGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.emailattachmentinfoGrid',
    itemId:'EmailAttachmentInfoGriditemId',
    controller:'viewMailController',
    reserveScrollbar:true,
    columnLines:true,
    isIdentifiedFlag:false,
    emailGridRecordArray:[],
    
    initComponent : function(){
    	this.columns = this.buildColumns();
        this.callParent(arguments);
    },
    
    listeners:{
		edit:'editEmailAttachmentGridColumn',
	},
    
    plugins: [
		{
	        ptype: 'cellediting',
	        clicksToEdit: 1
	    }
	],
	selType: 'checkboxmodel',
	
    buildColumns : function(){
        return {
			defaults : {
                draggable : false,
                sortable : false,
                hideable :false,
                resizable:false
			},
		   items:[
				{
					text : 'File Name',
					flex :1.5,
					dataIndex:'fileName',
					name: 'fileName',
					renderer: function (value) {
						return '<a href="#">'+ value +'</a>';
					}
				},
				{
					text : 'Partner Data Structure',
					flex :1.3,
					dataIndex:'dataStructureName',
					name: 'Partner Data Structure',
					editor: {
						xtype:'combobox',
						displayField:'dataStructureName',
						valueField:'id',
						queryMode :'local',
						store:Ext.data.StoreManager.lookup('PartnerProductLineStoreStoreId') == null ? Ext.create('AOC.store.PartnerProductLineStore') : Ext.data.StoreManager.lookup('PartnerProductLineStoreStoreId')
					},
					renderer:function(value, metaData, record){
						var editor = metaData.column.getEditor(record);    
					    var storeRecord = editor.store.getById(value);     
					    if(storeRecord) {       
					        return storeRecord.data[editor.displayField];
					    }
					    else{         
					        return null;
					    }
					}
				}, 
				{
					text : 'File Content Type',
					flex :1.3,
					dataIndex:'contentType',
					name: 'File Content Type',
					editor: {
						xtype:'combobox',
						displayField:'fileContentType',
						valueField:'fileContentType',
						queryMode :'local',
						store:new Ext.data.JsonStore({
							data:[
							      {
							    	  fileContentType:'Additional File' 
							      },
							      {
							    	  fileContentType:'Disregard' 
							      }
							],
							fields:['fileContentType']
						})
					}
				}, 
				{
					text : 'Status',
					flex :1,
					dataIndex:'status',
					name: 'status',
					renderer:function(value, record){
						if(value == 1){
							return 'Identified';
						}else if(value == 2){
							return 'Unidentified';
						}else{
							return 'Disregard';
						}
					}
				},
				{
					text : 'RBO Match',
					flex :1,
					dataIndex:'RBO Match',
					name: 'rboMatch'
				},
				{
					text : 'ProductLine Match',
					flex :1,
					dataIndex:'ProductLine Match',
					name: 'productLineMatch'
				},
				{
					text : 'File Type Match',
					flex :1.2,
					dataIndex:'fileContentMatch',
					name: 'fileContentMatch'
				}
			]
		};
    }
});