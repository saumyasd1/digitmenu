Ext.define('AOC.view.webform.AttachmentInfoGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.attachmentinfoGrid',
    itemId:'AttachmentInfoGriditemId',
	emptyText:'<div align=center> No records found.Please try with different search values.</div>',
    initComponent : function(){
        Ext.apply(this,{
            columns : this.buildColumns(),
			columnLines:true,
			layout:'fit'
        });
        this.callParent(arguments);
    },
    buildColumns : function(){
        return [{
        	text : 'S.No.',
          	flex :1,
            dataIndex:'sn'
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
        }];
    }
});