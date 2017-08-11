Ext.define('AOC.view.webform.AttachmentInfoGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.attachmentinfoGrid',
//    itemId:'AttachmentInfoGriditemId',
    requires: [
         'Ext.grid.column.Action'
    ],
    listeners:{
		'cellclick':'onAttachmentGridCellClick',
		'edit':'onAdditionalDataKeyCellChange',
		'beforeedit':'beforeEditorShow'
	},
	layout:'fit',
    initComponent : function(){
        Ext.apply(this,{
            columns : this.buildColumns(),
			columnLines:true,
			plugins: {
		        ptype: 'cellediting',
		        clicksToEdit: 1
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
                resizable:false,
                align:'left'
           },
           items:[
              {
            	  xtype:'rownumberer',
            	  text:'#',
            	  width:30,
            	  align:'center'
              }, {
            	  text : 'File Name',
            	  flex :1,
            	  dataIndex:'fileName',
            	  resizable:true
              }, {
            	  text : 'Additional DataFile Key',
            	  flex :1,
            	  dataIndex:'additionalDataFileKey',
            	  editor:{
            		  xtype:'textfield'
            	  }
              },
              {
	            text : 'File Type',
	            flex :1,
	            dataIndex:'fileType'
              },
              {
	            text: 'Delete',
	            xtype:'actioncolumn',
	            width :60,
	            align:'center',
	            renderer:function(v,cell,record){
	            	return '<i class="deleteClass fa fa-trash-o" style="cursor:pointer;font-size:16px;"></i>';
	            }
              }
        ]};
    }
});