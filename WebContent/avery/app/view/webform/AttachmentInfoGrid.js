Ext.define('AOC.view.webform.AttachmentInfoGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.attachmentinfoGrid',
    itemId:'AttachmentInfoGriditemId',
	emptyText:'<div align=center> No records found.Please try with different search values.</div>',
    initComponent : function(){
	var me=this;
        Ext.apply(this,{
            columns : this.buildColumns(),
			dockedItems : this.buildDockedItems(),
			columnLines:true,
			layout:'fit'
        });
        
        this.callParent(arguments);
        
    },
    buildColumns : function(){
    	var me=this;
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
    },
			 buildDockedItems : function(){
				 var me=this;
			        return [
						{
			            xtype : 'pagingtoolbar',
			            dock  : 'bottom',
			            ui    : 'darktoolbar',
			            itemId:'attachmentinfopagingtoolbar',
			            store :me.store,
						displayInfo:true,
						plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
			        }];
			    }
});