Ext.define('AOC.view.webform.AttachmentInfoGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.attachmentinfoGrid',
    itemId:'AttachmentInfoGriditemId',
    controller:'webFormMain',
	emptyText:'<div align=center> No records found.Please try with different search values.</div>',
    initComponent : function(){
        Ext.apply(this,{
            columns : this.buildColumns(),
			columnLines:true,
			layout:'fit',
			listeners:{
				'cellclick':'onAttachmentGridCellClick'
			}
        });
        this.callParent(arguments);
    },
    buildColumns : function(){
        return [{
        	xtype:'rownumberer'
        },{
            text : 'File Name',
            flex :1,
            dataIndex:'fileName'
        },
        {
            text : 'File Type',
            flex :1,
            data : '',
			dataIndex:'fileType'
        },
        {
            text : 'Delete',
            width :45,
            data : '',
            renderer:function(v,cell,record){
					return '<div><img class="viewattachment" src="' + deleteImageSrc + '" /></div>';
        }
        }];
    }
});