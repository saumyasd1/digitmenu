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
		   // me.columns[2].editor.readOnly=showFiberPercentage;
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
			{ text: AOCLit.custPONumber, dataIndex: 'customerPONumber' , flex:1,
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
			{ text: me.variableColumnName, dataIndex: 'variableDataValue' ,flex:1, editor:{xtype:'textfield'}},
			{ text: AOCLit.fiberContentPercent, dataIndex: 'fiberPercent' ,flex:1, editor:'textfield'}
		];
    },
    dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'top', 
			height: 50,
			items :[
				{
				  xtype:'tbtext',
				  margin:'10 10 10 10',
				  text:'<font size=5px>Bulk Update</font>'
				}
			]
		},
		{
			xtype: 'toolbar',
			dock: 'bottom', 
			height: 60,
			style: 'background-color: #FBFBFB;',
			items :[
				'->',
				{
					xtype:'button',
					text:AOCLit.undoChangesText,
					handler:'cancelChanges',
					width:65,
					ui:'grey-plain'
				},
				{
					xtype:'button',
					text:AOCLit.Save,
					handler:'saveOrderLineDetails',
					width:65,
					ui:'blue'
				}
			]
		}
	]
});