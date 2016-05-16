Ext.define('AOC.view.orderqueue.BulkUpdateSalesVariableHeaderGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.bulkUpdateSalesVariableHeaderGrid',
    itemId:'BulkUpdateSalesVariableHeaderGrid',
	variableColumnName:null,
	controller:'salesorder',
    requires:['AOC.util.Helper'],
	emptyText: AOCLit.noContentTypeDispMsg,
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
			    	 helper:AOC.util.Helper,
			    	 'selectionchange':function( grid, selection, eOpts ){
			    		 helper.BulkUpdate( grid, selection, eOpts);
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
        return [{ text: AOCLit.custPONumber, dataIndex: 'salesOrdercustomerPONumber' ,flex:1},
                { text: AOCLit.custItemNo, dataIndex: 'salesOrdercustomerItemNumber' ,flex:1},
                { text: me.variableColumnName, dataIndex: 'variabledatavalue' ,flex:1,editor:{xtype:'textfield'}},
                { text: AOCLit.fiberContentPercent, dataIndex: 'fiberPercent' ,flex:1,editor:'textfield'}
		];
    },
    tbar: { 
		height: 50,
	    items : 
	    	[
			 {
	              xtype:'button',
				  text:AOCLit.Save,
				  handler:'saveSalesOrderDetails'
	         },
	         {
	              xtype:'button',
				  text:AOCLit.Cancel,
				  handler:'cancelChanges'
	         }
			 ]
}
});