Ext.define('AOC.view.viewmail.EmailAttachmentInfoGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.emailattachmentinfoGrid',
    itemId:'EmailAttachmentInfoGriditemId',
    controller:'viewMailController',
    reserveScrollbar:true,
    columnLines:true,
    isIdentifiedFlag:false,
    contextName:'',
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
	                if (editor.grid.status == AOCLit.emailIdentifiedStatus){
	                	return false;
	                } 
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
					text : 'File Name',
					flex :1.5,
					dataIndex:'fileName',
					name: 'fileName',
					renderer: function (value) {
						return '<a class="emailAttachmentLink" href="#">'+ value +'</a>';
					}
				},
				{
					text : 'Partner Data Structure',
					flex :2,
					dataIndex:'dataStructureNameId',
					name: 'Partner Data Structure',
					editor: {
						xtype:'combobox',
						displayField:'dataStructureName',
						valueField:'id',
						queryMode :'local',
						editable:false,
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
					text : 'File Content Type',
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
					text : 'Additional Data File Key',
					flex :1.3,
					dataIndex:'additionalDataFileKey',
					name: 'additionalDataFileKey',
					editor:'textfield'
				}, 
				{
					text : 'Status',
					flex :1,
					dataIndex:'status',
					name: 'status',
					renderer:function(value, record){
						if(value == AOCLit.emailAttachmentInfoGridIdentifiedStatus){
							return 'Identified';
						}else if(value == AOCLit.emailAttachmentInfoGridUnIdentifiedStatus){
							return 'Unidentified';
						}else if(value == AOCLit.emailAttachmentInfoGridDisregardStatus){
							return 'Disregard';
						}
						return '';
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