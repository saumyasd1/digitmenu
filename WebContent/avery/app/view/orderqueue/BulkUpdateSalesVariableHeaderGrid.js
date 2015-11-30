Ext.define('AOC.view.orderqueue.BulkUpdateSalesVariableHeaderGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.bulkUpdateSalesVariableHeaderGrid',
    itemId:'BulkUpdateSalesVariableHeaderGrid',
	variableColumnName:null,
	controller:'salesorder',
	emptyText:'<div align=center> No content type(s) to display.</div>',
	runTime : AOC.config.Runtime,
    initComponent : function(){
	var me=this;
	this.fieldArray = [];
        Ext.apply(this,{
            columns : this.buildColumns(),
			columnLines:true,
			layout:'fit',
			selModel: {
			       type: 'spreadsheet'
			    },
			    plugins: {
			        ptype: 'cellediting',
			        clicksToEdit: 1
			        
			    },
			    listeners:{
		        	'selectionchange':function( grid, selection, eOpts ){
                     if(selection.startCell)
							var store=grid.store;
                             var intialCell=selection.startCell;
                         var dataindex=intialCell.column.dataIndex;
                             var value=intialCell.record.get(dataindex);
                             var initialrowIdx=intialCell.rowIdx;
                             var lastrowIdx=selection.endCell.rowIdx;
                             var start=initialrowIdx,end=lastrowIdx;
                             if(lastrowIdx<initialrowIdx){
                             	start=lastrowIdx;
                             	end=initialrowIdx;
                             }
                             for(var i=(start+1);i<=end;i++){
                                 store.getAt(i).set(dataindex,value);
                             }
		        	}
		        }
			    
        });
        this.callParent(arguments);
        me.store.load(function(obj){
        	var reader = me.store.proxy.reader;
		    var showFiberPercentage=reader.createAccessor('showFiberPercentage')(reader.rawData);   
		    me.columns[2].editor.readOnly=showFiberPercentage;
		    if(showFiberPercentage)
			    me.columns[3].show();
		    else
		    	me.columns[3].hide();
	    });
    },
    buildColumns : function(){
    	var me=this;
        return [{ text: "Customer PO Number", dataIndex: 'salesOrdercustomerPONumber' ,flex:1},
                { text: "Customer Item Number", dataIndex: 'salesOrdercustomerItemNumber' ,flex:1},
                { text: me.variableColumnName, dataIndex: 'variabledatavalue' ,flex:1,editor:{xtype:'textfield'}},
                { text: 'Fiber Content Percentage', dataIndex: 'fiberPercent' ,flex:1,editor:'textfield'}
		];
    },
    tbar: { 
		height: 50,
	    items : 
	    	[
			 {
	              xtype:'button',
				  text:'Save',
				  handler:'saveSalesOrderDetails'
	         },
	         {
	              xtype:'button',
				  text:'Cancel',
				  handler:'cancelChanges'
	         }
			 ]
}
});