Ext.define('AOC.view.viewmail.EmailAttachmentInfoGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.emailattachmentinfoGrid',
    itemId:'EmailAttachmentInfoGriditemId',
    controller:'viewMailController',
    reserveScrollbar:true,
    columnLines:true,
    isIdentifiedFlag:false,
    requires:[
          'AOC.view.viewmail.ViewMailController',
          'AOC.store.PartnerProductLineStore'
    ],
    emptyText: AOCLit.noContentTypeDispMsg,
    emailGridRecordArray:[],
    
    initComponent : function(){
    	this.columns = this.buildColumns();
        this.callParent(arguments);
    },
    
    listeners:{
		edit:'editEmailAttachmentGridColumn',
		cellclick:'onEmailAttachmentGridCellClick'
	},
    
    plugins: [
		{
	        ptype: 'cellediting',
	        clicksToEdit: 1,
	        listeners: {
                beforeedit: function(e, editor){
                	//editing only enabled for emailQueue status is UnIndentified(3)
	                if (editor.grid.status == AOCLit.emailUnidentifiedStatus || editor.grid.status == AOCLit.emailDisregardedStatus ){
	                	if(editor.field =='dataStructureNameId'){
	                		if(editor.record.data.contentType==''){
	                			return false;
	                		}
	                		//filter partner data structure for perticular attachment
	     		                Ext.Ajax.request({
	     		                	url:applicationContext + '/rest/productLines/datastructure/'+editor.record.get('id'),
	     		                	success:function(response){
	     		                		var json = JSON.parse(response.responseText);
	     		                		if(json.dataStructures.length > 0){
	     		                			editor.grid.columns[2].field.store.loadData(json.dataStructures);
	     		                		}else{
	     		                			editor.grid.columns[2].field.store.loadData([]);
	     		                		}
	     		                	},
	     		                	failure:function(){
	     		                		editor.grid.columns[2].field.store.loadData([]);
	     		                	}
	     		                });
	     		                return true;
	                	}else{
	                		return true;
	                	}
	                }
	               
	                return false;
                }
	        }
	    }
	],
	selType: 'checkboxmodel',

    buildColumns : function(){
    	var me = this;
        return {
			defaults : {
                draggable : false,
                sortable : false,
                hideable :false,
                resizable:false
			},
		   items:[
				{
					text : AOCLit.fileName,
					flex :1.5,
					dataIndex:'fileName',
					name: 'fileName',
					resizable:true,
					renderer: function (value,metadata) {
						metadata.tdAttr = 'data-qtip="<font color=blue>' + value + '<font>"';
						return '<a class="emailAttachmentLink" href="#">'+ value +'</a>';
					}
				},
				{
					text : AOCLit.fileContentType,
					flex :1.3,
					dataIndex:'contentType',
					name: 'File Content Type',
					editor: {
						xtype:'combobox',
						displayField:'name',
						valueField:'code',
						queryMode :'local',
						editable:false,
						store:new Ext.data.JsonStore({
							data:[
						      {
						    	  name:'Order',
						    	  code:'Order'
						      },
						      {
						    	  name:'Additional Data',
						    	  code:'AdditionalData'
						      },
						      {
						    	  name:'Disregard',
						    	  code:'Disregard'
						      }
							],
							fields:['name', 'code']
						})
					} 
				},
				{
					text : AOCLit.partnerDataStructure,
					flex :2,
					dataIndex:'dataStructureNameId',
					name: 'Partner Data Structure',
					editor: {
						xtype:'combobox',
						displayField:'dataStructureName',
						valueField:'id',
						queryMode :'local',
						editable:true,
						store:Ext.data.StoreManager.lookup('PartnerProductLineStoreStoreId') == null ? Ext.create('AOC.store.PartnerProductLineStore') : Ext.data.StoreManager.lookup('PartnerProductLineStoreStoreId')
					},
					renderer:function(value, metaData, record){
						if(me.status == AOCLit.emailIdentifiedStatus){
							return record.get('dataStructureName');
						}
						
						var editor = metaData.column.getEditor(record),    
					    	storeRecord = editor.store.getById(value);
						
					    if(storeRecord) {       
					        return storeRecord.data[editor.displayField];
					    }
					    else{         
					        return null;
					    }
					}
				}, 
				{
					text : AOCLit.additionalDataFileKey,
					flex :1.3,
					dataIndex:'additionalDataFileKey',
					name: 'additionalDataFileKey',
					editor:'textarea'
				}, 
				{
					text : AOCLit.rboMatch,
					flex :1,
					dataIndex:'RBO Match',
					name: 'rboMatch'
				},
				{
					text : AOCLit.productLineMatch,
					flex :1,
					dataIndex:'ProductLine Match',
					name: 'productLineMatch'
				},
				{
					text : AOCLit.fileTypeMatch,
					flex :1.2,
					dataIndex:'fileContentMatch',
					resizable:true,
					name: 'fileContentMatch'
				},
				{
					text : AOCLit.Status,
					flex :1,
					dataIndex:'status',
					name: 'status',
					renderer:function(value,metadata,rec){
						return Helper.getSatus(rec);
					}
				}
			]
		};
    }
});