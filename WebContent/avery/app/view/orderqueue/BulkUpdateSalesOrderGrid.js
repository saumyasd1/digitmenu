Ext.define('AOC.view.orderqueue.BulkUpdateSalesOrderGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.bulkupdatesalesordergrid',
    itemId:'BulkUpdateSalesOrderGrid',
    controller:'salesorder',
	emptyText:'<div align=center> No content type(s) to display.</div>',
	runTime : AOC.config.Runtime,
    initComponent : function(){
	var me=this;
	this.fieldArray = [];
        Ext.apply(this,{
            columns : this.buildColumns(),
			columnLines:true,
			dockedItems : this.buildDockedItems(),
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

    },
    buildColumns : function(){
    	var me=this;
        return [
{ text: 'Division',  dataIndex: 'division',editor:'textfield' },
{ text: 'OrderSource', dataIndex: 'orderSource', editor:'textfield' },
{ text: 'SOLD TO RBO Number', dataIndex: 'soldTORBONumber',editor:'textfield' },
{ text: 'Oracle Bill to Site Number', dataIndex: 'oracleBilltoSiteNumber',editor:'textfield' },
{ text: 'Oracle Ship to Site Number', dataIndex: 'oracleShiptoSiteNumber',editor:'textfield' },
{ text: 'Shipping method', dataIndex: 'shippingMethod',editor:{xtype:'combo',store:[['ACS','ACS'],['ADP GLOBAL EXPRESS','ADP GLOBAL EXPRESS'],['AIRTRANS LOG - BY AIR','AIRTRANS LOG - BY AIR'],['A-LINK','A-LINK']]} },
{ text: 'Customer PO Number', dataIndex: 'customerPONumber',editor:'textfield' },
{ text: 'Retailer poCustomer job', dataIndex: 'retailerPO_CustomerJob',editor:'textfield' },
{ text: 'Oracle Item Number', dataIndex: 'oracleItemNumber',editor:'textfield' },
{ text: 'Customer Item Number', dataIndex: 'customerItemNumber',editor:'textfield' },
{ text: 'Item Description', dataIndex: 'itemDescription',editor:'textfield' },
{ text: 'Orderded Qty', dataIndex: 'orderdedQty',editor:'textfield' },
{ text: 'Date Ordered', dataIndex: 'dateOrdered',editor:'textfield' },
{ text: 'Request date', dataIndex: 'ustomerRequestDate',editor:'textfield' },
{ text: 'promise date', dataIndex: 'promiseDate',editor:'textfield' },
{ text: 'Freight term', dataIndex: 'freightTerms',editor:'textfield' },
{ text: 'CSR', dataIndex: 'csr',editor:'textfield' },
{ text: 'packing instruction', dataIndex: 'packinginstruction',editor:'textfield' },
{ text: 'Shipping instruction', dataIndex: 'shippingInstructions',editor:'textfield' },
{ text: 'Invoice line instruction', dataIndex: 'invoicelineInstruction',editor:'textfield' },
{ text: 'Division for Interface ERP ORG', dataIndex: 'divisionforInterfaceERPORG',editor:'textfield' },
{ text: 'Bill to contact', dataIndex: 'billToContact',editor:'textfield' },
{ text: 'Bill to tel', dataIndex: 'billToTEL',editor:'textfield' },
{ text: 'Bill to EMAIL', dataIndex: 'billToEMAIL',editor:'textfield' },
{ text: 'Ship to contact', dataIndex: 'shipTOContact',editor:'textfield' },
{ text: 'Ship to tel', dataIndex: 'shipTOTEL',editor:'textfield' },
{ text: 'Ship to FAX', dataIndex: 'shipTOFAX',editor:'textfield' },
{ text: 'Ship to EMAIL', dataIndex: 'shipTOEMAIL',editor:'textfield' },
{ text: 'Artwork hold', dataIndex: 'artworkhold',editor:'checkbox' },
{ text: 'Artwork work attachment', dataIndex: 'artworkworkattachment',editor:'checkbox' },
{ text: 'Variable data Breakdown', dataIndex: 'variableDataBreakdown',editor:'textfield' },
{ text: 'Manu. Note', dataIndex: 'manufacturingnotes',editor:'textfield' },
{ text: 'Order type', dataIndex: 'ordertype',editor:'textfield' },
{ text: 'Order by', dataIndex: 'orderby',editor:'textfield' },
{ text: 'End customer', dataIndex: 'endcustomer',editor:'textfield' },
{ text: 'Shipping only note', dataIndex: 'shippingonlynotes',editor:'textfield' },
{ text: 'Bank charge', dataIndex: 'bankCharge',editor:'textfield' },
{ text: 'Freight charge', dataIndex: 'freightCharge',editor:'textfield' },
{ text: 'Shipping hold', dataIndex: 'shippinghold',editor:'checkbox' },
{ text: 'Production hold', dataIndex: 'productionhold',editor:'checkbox' },
{ text: 'Split ship set by', dataIndex: 'splitshipset',editor:'textfield' },
{ text: 'Agreement', dataIndex: 'agreement',editor:'textfield' },
{ text: 'Model serial Number', dataIndex: 'modelSerialNumber',editor:'textfield' },
{ text: 'Waive MOQ', dataIndex: 'waiveMOQ',editor:'checkbox' },
{ text: 'APO type', dataIndex: 'apoType',editor:'textfield' }
    ];
    },
    tbar: { 
		height: 50,
	    items : 
	    	[
			 {
	              xtype:'button',
				  text:'Save',
				  handler:'saveSalesOrder'
	         },
	         {
	              xtype:'button',
				  text:'Cancel',
				  handler:'cancelChanges'
	         }
			 ]
},
    buildDockedItems : function(){
    	var me=this;
        return [
			{
            xtype : 'pagingtoolbar',
            dock : 'bottom',
            ui : 'darktoolbar',
            itemId:'pagingtoolbarVisitManage',
           store:me.store,
            displayInfo:true,
            plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
            
        }];
    }
});