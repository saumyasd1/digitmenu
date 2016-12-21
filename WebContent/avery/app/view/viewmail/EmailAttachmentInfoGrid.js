Ext.define('AOC.view.viewmail.EmailAttachmentInfoGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.emailattachmentinfoGrid',
    itemId:'EmailAttachmentInfoGriditemId',
    controller:'viewMailController',
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
        return {
       defaults : {
                draggable : false,
                sortable : false,
                hideable :false,
                resizable:false
               },
               items:[
                      {
        		            xtype:'actioncolumn',
        		            width:25,
        		            baseCls:'custom-action',
        		  	        items:[
        		  	      {
        				  	    	  icon: AOC.config.Settings.buttonIcons.menuIcon,
        				  	    	  handler: 'onClickMenu'
        				  	    	
        		  	      }]
        		        },{
            text : 'File Name',
            flex :1,
            dataIndex:'fileName'
        },
        {
            text : 'Partner Data Structure',
            flex :1,
	        dataIndex:'Partner Data Structure'
        },
        {
            text : 'Download',
            flex :1,
	        dataIndex:'Download'
        },
        {
            text : 'Group',
            flex :1,
	        dataIndex:'Group'
        },
        {   xtype: 'checkcolumn',
            text : 'Additional File',
            flex :1,
	        dataIndex:'Additional File',
	        editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        },{
            text : 'RBO Match',
            flex :1,
	        dataIndex:'RBO Match'
        },
        {
            text : 'ProductLine Match',
            flex :1,
	        dataIndex:'ProductLine Match'
        },
        {
            text : 'File Type Match',
            flex :1,
	        dataIndex:'fileContentType'
        }
        ]};
    }
});