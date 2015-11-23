Ext.define('AOC.view.orderqueue.BulkUpdateSalesOrderGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.bulkupdatesalesordergrid',
    itemId:'BulkUpdateSalesOrderGrid',
    controller:'salesorder',
	//store:'SalesOrderStore',
//	requires : ['AOC.controller.orderqueue.SalesOrderViewController'
//    ],
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
                                for(var i=(initialrowIdx+1);i<=lastrowIdx;i++){
                                    store.getAt(i).set(dataindex,value);
                                }
		        	}
		        }
        });
        this.callParent(arguments);

    },
    buildColumns : function(){
    	var me=this;
        return [{ text: 'Division',  dataIndex: 'Division',editor:'textfield' },
{ text: 'OrderSource', dataIndex: 'OrderSource', editor:'textfield' },
{ text: 'SOLD TO RBO Number', dataIndex: 'SOLDTORBONumber',editor:'textfield' },
{ text: 'Oracle Bill to Site Number', dataIndex: 'OracleBilltoSiteNumber',editor:'textfield' },
{ text: 'Oracle Ship to Site Number', dataIndex: 'OracleShiptoSiteNumber',editor:'textfield' },
{ text: 'Shipping method', dataIndex: 'Shippingmethod',editor:{xtype:'combo',store:[['ACS','ACS'],['ADP GLOBAL EXPRESS','ADP GLOBAL EXPRESS'],['AIRTRANS LOG - BY AIR','AIRTRANS LOG - BY AIR'],['A-LINK','A-LINK']]} },
{ text: 'Customer PO Number', dataIndex: 'CustomerPONumber',editor:'textfield' },
{ text: 'Retailer poCustomer job', dataIndex: 'RetailerpoCustomerjob',editor:'textfield' },
{ text: 'Oracle Item Number', dataIndex: 'OracleItemNumber',editor:'textfield' },
{ text: 'Customer Item Number', dataIndex: 'CustomerItemNumber',editor:'textfield' },
{ text: 'Item Description', dataIndex: 'ItemDescription',editor:'textfield' },
{ text: 'Orderded Qty', dataIndex: 'OrderdedQty',editor:'textfield' },
{ text: 'Date Ordered', dataIndex: 'DateOrdered',editor:'textfield' },
{ text: 'Request date', dataIndex: 'Requestdate',editor:'textfield' },
{ text: 'promise date', dataIndex: 'promisedate',editor:'textfield' },
{ text: 'Freight term', dataIndex: 'Freightterm',editor:'textfield' },
{ text: 'CSR', dataIndex: 'CSR',editor:'textfield' },
{ text: 'packing instruction', dataIndex: 'packinginstruction',editor:'textfield' },
{ text: 'Shipping instruction', dataIndex: 'Shippinginstruction',editor:'textfield' },
{ text: 'Invoice line instruction', dataIndex: 'Invoicelineinstruction',editor:'textfield' },
{ text: 'Division for Interface ERP ORG', dataIndex: 'DivisionforInterfaceERPORG',editor:'textfield' },
{ text: 'Bill to contact', dataIndex: 'Billtocontact',editor:'textfield' },
{ text: 'Bill to tel', dataIndex: 'Billtotel',editor:'textfield' },
{ text: 'Bill to EMAIL', dataIndex: 'BilltoEMAIL',editor:'textfield' },
{ text: 'Ship to contact', dataIndex: 'Ship to contact',editor:'textfield' },
{ text: 'Ship to tel', dataIndex: 'Shiptotel',editor:'textfield' },
{ text: 'Ship to FAX', dataIndex: 'ShiptoFAX',editor:'textfield' },
{ text: 'Ship to EMAIL', dataIndex: 'Ship to EMAIL',editor:'textfield' },
{ text: 'Artwork hold', dataIndex: 'Artwork hold',editor:'checkbox' },
{ text: 'Artwork work attachment', dataIndex: 'Artwork for Reference',editor:'checkbox' },
{ text: 'Variable data Breakdown', dataIndex: 'Variable data Breakdown',editor:'textfield' },
{ text: 'Manu. Note', dataIndex: 'ManuNote',editor:'textfield' },
{ text: 'Order type', dataIndex: 'Ordertype',editor:'textfield' },
{ text: 'Order by', dataIndex: 'Orderby',editor:'textfield' },
{ text: 'End customer', dataIndex: 'Endcustomer',editor:'textfield' },
{ text: 'Shipping only note', dataIndex: 'Shippingonlynote',editor:'textfield' },
{ text: 'Bank charge', dataIndex: 'Bankcharge',editor:'textfield' },
{ text: 'Freight charge', dataIndex: 'Freightcharge',editor:'textfield' },
{ text: 'Shipping hold', dataIndex: 'Shippinghold',editor:'checkbox' },
{ text: 'Production hold', dataIndex: 'Productionhold',editor:'checkbox' },
{ text: 'Split ship set by', dataIndex: 'Splitshipsetby',editor:'textfield' },
{ text: 'Agreement', dataIndex: 'Agreement',editor:'textfield' },
{ text: 'Model serial Number', dataIndex: 'ModelserialNumber',editor:'textfield' },
{ text: 'Waive MOQ', dataIndex: 'WaiveMOQ',editor:'checkbox' },
{ text: 'APO type', dataIndex: 'APOtype',editor:'textfield' }
		];
    },
    tbar: { 
		height: 50,
	    items : 
	    	[
			 {
	              xtype:'button',
				  text:'Save',
				  handler:'backButton'
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