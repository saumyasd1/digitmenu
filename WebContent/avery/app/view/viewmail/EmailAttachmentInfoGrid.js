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
//			listeners:{
//				'cellclick':'onAttachmentGridCellClick'
//			}
        });
        this.callParent(arguments);
    },
    plugins: [
              Ext.create('Ext.grid.plugin.CellEditing', {
                  clicksToEdit: 1
              })
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
                return '<a href="#">'+value+'</a>';
            }
        },
        {
            text : 'Partner Data Structure',
            flex :1,
	        dataIndex:'Partner Data Structure',
	        name: 'Partner Data Structure',
	        editor: {
	        	xtype:'combobox'
	        }
        }, {
        	xtype: 'checkcolumn',
            text : 'Additional File',
            flex :1,
	        dataIndex:'Additional File',
	        name: 'additionalDataFileKey',
	        editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        },
        {
            text : 'Group',
            flex :1,
	        dataIndex:'Group',
	        name: 'Group'
        },{
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
	        dataIndex:'fileContentType',
	        name: 'fileContentType'
        },
        {
        	xtype: 'checkcolumn',
            text : 'Disregard',
            flex :1,
	        dataIndex:'disregard',
	        name: 'disregard',
	        editor: {
                xtype: 'checkbox',
               // cls: 'x-grid-checkheader-editor'
            }
        }
        ]};
    }
});