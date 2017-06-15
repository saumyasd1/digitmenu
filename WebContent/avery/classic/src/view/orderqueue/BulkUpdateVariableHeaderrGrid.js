Ext.define('AOC.view.orderqueue.BulkUpdateVariableHeaderrGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.bulkUpdateVariableHeaderrGrid',
    itemId:'BulkUpdateVariableHeaderrGrid',
	variableColumnName:null,
	controller:'orderlinebulkupdate',
	requires:[
		'AOC.util.Helper',
		'Ext.grid.selection.SpreadsheetModel',
		'AOC.view.orderqueue.BulkUpdateController',
		'Ext.grid.plugin.Clipboard'
	],
	emptyText: AOCLit.noContentTypeDispMsg,
	runTime : AOC.config.Runtime,
    initComponent : function(){
		var me=this;
        Ext.apply(this,{
            columns : this.buildColumns(),
			columnLines:false,
			selModel: {
			       type: 'spreadsheet'
			    },
			    plugins: [
					{
						ptype: 'cellediting',
						clicksToEdit: 2
					},
					{
						ptype: 'clipboard'
					}
				],
			    listeners:{
					'selectionchange':function( grid, selection, eOpts ){
						AOC.util.Helper.BulkUpdate( grid, selection, eOpts);
					}
		        }
        });
        this.callParent(arguments);
        me.store.load({
        	params:{variablename:me.variableColumnName},
        	callback:function(obj){
        	var reader = me.store.proxy.reader;
		    var showFiberPercentage = reader.createAccessor('showFiberPercentage')(reader.rawData);   
		    if(showFiberPercentage){
			    me.columns[4].show();
			}
		    else{
		    	me.columns[4].hide();
			}
	    }
        });
    },
    buildColumns : function(){
    	var me=this;
        return [
			{
				xtype: 'rownumberer',
				width: 46,
				editRenderer:  '&#160;',
				tdCls: me.rowNumbererTdCls,
				cls: me.rowNumbererHeaderCls,
				locked: me.hasLockedHeader,
				text:'#'
			},
			{ 
				text: AOCLit.custPONumber, 
				dataIndex: 'customerPONumber', 
				align:'left',
				flex:1,
				renderer:function(v, meteData, record){
					return record.get('varOrderLine') ? record.get('varOrderLine').customerPONumber : '';
				}
			},
			{ 
				text: AOCLit.custItemNo, 
				dataIndex: 'customerItemNumber' ,
				flex:1,
				align:'right',
				renderer:function(v, meteData, record){
					return record.get('varOrderLine') ? record.get('varOrderLine').customerItemNumber : '';
				}
			},
			{ 
				text: me.variableColumnName, 
				dataIndex: 'variableDataValue' ,
				flex:1, 
				align:'left',
				editor:{xtype:'textfield'}
			},
			{ 
				text: AOCLit.fiberContentPercent, 
				dataIndex: 'fiberPercent',
				flex:1, 
				editor:'textfield'
			}
		];
    },
    buttons: [
		{
			text:AOCLit.undoChangesText,
			handler:'cancelChanges'
		},
		{
			text:AOCLit.Save,
			handler:'saveOrderLineDetails'
		}
	]
});