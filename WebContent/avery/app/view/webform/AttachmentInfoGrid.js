Ext.define('AOC.view.webform.AttachmentInfoGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.attachmentinfoGrid',
    itemId:'AttachmentInfoGriditemId',
    controller:'webFormMain',
    initComponent : function(){
        Ext.apply(this,{
            columns : this.buildColumns(),
			columnLines:true,
			layout:'fit',
			plugins: {
		        ptype: 'cellediting',
		        clicksToEdit: 1
		    },
			listeners:{
				'cellclick':'onAttachmentGridCellClick',
				'edit':'onAdditionalDataKeyCellChange',
				'beforeedit':'beforeEditorShow'
			}
        });
        this.callParent(arguments);
    },
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
            	  xtype:'rownumberer'
              },
              {
            	  text : 'File Name',
            	  flex :1,
            	  dataIndex:'fileName',
            	  resizable:true
              },
              {
            	  text : 'Additional DataFile Key',
            	  flex :1,
            	  data : '',
            	  dataIndex:'additionalDataFileKey',
            	  editor:{
            		  xtype:'textfield'
            	  }
	        },
	        {
	            text : 'File Type',
	            flex :1,
	            data : '',
	            dataIndex:'fileType'
	        },
	        {
	            text : 'Delete',
	            width :60,
	            data : '',
	            renderer:function(v,cell,record){
	            	return '<i class="deleteClass fa fa-trash-o" style="cursor:pointer;font-size:16px;"></i>';
	            }
	        }
        ]};
    }
});