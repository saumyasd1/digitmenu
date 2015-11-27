Ext.define('AOC.view.orderqueue.BulkUpdateOrderLineGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.bulkupdateorderlinegrid',
    itemId:'BulkUpdateOrderlineGrid',
    controller:'orderline',
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

    },
    buildColumns : function(){
    	var me=this;
        return [{ text: 'Customer PO Number',  dataIndex: 'customerPONumber', width:250},
                { text: 'Ordered Date ', dataIndex: 'orderedDate',width:100 },
                { text: 'Partner Customer Name', dataIndex: 'partnerCustomerName',width:170},
                { text: 'Customer Request Date', dataIndex: 'customerRequestDate',width:170},
                { text: 'Partner Vendor Name', dataIndex: 'partnerVendorName',width:170},
                { text: 'Ship To Customer', dataIndex: 'shipToCustomer',width:170 },
                { text: 'Ship To Contact', dataIndex: 'shipToContact',width:170},
                { text: 'Ship To Customer', dataIndex: 'shipToCustomer',width:170 },
                { text: 'Ship To Contact', dataIndex: 'shipToContact',width:170},
                { text: 'Ship To Address 1', dataIndex: 'shipToAddress1',width:170},
                { text: 'Ship To Address 2', dataIndex: 'shipToAddress2',width:170},
                { text: 'Ship To Address 3', dataIndex: 'shipToAddress3',width:170},
                { text: 'Ship To City', dataIndex: 'shipToCity',width:170},
                { text: 'Ship To Country', dataIndex: 'shipToCountry',width:170},
                { text: 'Ship To State', dataIndex: 'shipToState',width:170},
                { text: 'Ship To Zip', dataIndex: 'shipToZip',width:170},
                { text: 'Ship To Email', dataIndex: 'shipToEmail',width:170},
                { text: 'Ship To Fax', dataIndex: 'shiplToFax',width:170},
                { text: 'Ship To Telephone', dataIndex: 'shipToTelephone',width:170},
                { text: 'Bill To Customer', dataIndex: 'billToCustomer',width:170 },
                { text: 'Bill To Contact', dataIndex: 'billToContact',width:170},
                { text: 'Bill To Address 1', dataIndex: 'billToAddress1',width:170 },
                { text: 'Bill To Address 2', dataIndex: 'billToAddress2',width:170  ,editor:'textfield'},
                { text: 'Bill To Address 3', dataIndex: 'billToAddress3',width:170  ,editor:'textfield'},
                { text: 'Bill To City', dataIndex: 'billToCity',width:170 ,editor:'textfield'
                },
                { text: 'Bill To Country', dataIndex: 'billToCountry',width:170 ,editor:'textfield'
                },
                { text: 'Bill To State', dataIndex: 'billToState',width:170  ,editor:'textfield'
                },
                { text: 'Bill To Zip', dataIndex: 'billToZip',width:170  ,editor:'textfield'
                },
                { text: 'Bill To Email', dataIndex: 'billToEmail',width:170},
                { text: 'Bill To Fax', dataIndex: 'billToFax',width:170},
                { text: 'Bill To Telephone', dataIndex: 'billToTelephone',width:170},
                { text: 'Requested Devlivery Date', dataIndex: 'requestedDevliveryDate',width:180},
                { text: 'Special Instruction', dataIndex: 'specialInstruction',width:170},
                { text: 'Order Received Date', dataIndex: 'orderReceivedDate',width:170},
                { text: 'Sold To RBONumber', dataIndex: 'soldTORBONumber' ,width:180 },
                { text: 'Oracle Bill to SiteNumber', dataIndex: 'oracleBilltoSiteNumber',width:190,editor:'textfield'},
                { text: 'Oracle Ship to Site Number', dataIndex: 'oracleShiptoSiteNumber' ,width:180,editor:'textfield' },
                { text: 'Shipping Method', dataIndex: 'shippingMethod',width:170,editor:{
                		xtype:'combo',
                		store:[['ACS','ACS'],['ADP GLOBAL EXPRESS','ADP GLOBAL EXPRESS']]
                	} 
                },
                { text: 'Retailer PO/Customer Job', dataIndex: 'retailerPO_CustomerJob',width:180},
                { text: 'Avery Item Number', dataIndex: 'averyItemNumber',width:180},
                { text: 'Customer Item Number', dataIndex: 'customerItemNumber' ,width:180 },
                { text: 'Item Description', dataIndex: 'itemDescription',width:150},
                { text: 'Customer Color Code', dataIndex: 'customerColorCode',width:180},
                { text: 'Customer Color Description', dataIndex: 'customerColorDescription',width:200},
                { text: 'Customer Size', dataIndex: 'customerSize',width:160},
                { text: 'Customer Unit Price', dataIndex: 'customerUnitPrice',width:180 },
                { text: 'Customer Cost', dataIndex: 'customerCost',width:180},
                { text: 'Contract Number', dataIndex: 'contractNumber',width:180},
                { text: 'Style No', dataIndex: 'styleNo',width:180 },
                { text: 'Customer Item Number 1', dataIndex: 'customerItemNumber1',width:180},
                { text: 'Customer Item Number 2', dataIndex: 'customerItemNumber2',width:180},
                { text: 'Customer Season', dataIndex: 'customerSeason' ,width:180 },
                { text: 'Customer UOM', dataIndex: 'customerUOM',width:180},
                { text: 'Customer Ordered Qty', dataIndex: 'customerOrderedQty',width:180},
                { text: 'Calculated Orderded Qty', dataIndex: 'calculatedOrderdedQty',width:180},
                { text: 'Order Date', dataIndex: 'orderDate',width:160},
                { text: 'Promise Date', dataIndex: 'promiseDate',width:160},
                { text: 'Freight Terms', dataIndex: 'freightTerms',width:160},
                { text: 'CSR', dataIndex: 'csr',width:160 },
                { text: 'Packing Instruction', dataIndex: 'packingInstruction',width:180 },
                { text: 'Shipping Instructions', dataIndex: 'shippingInstructions',width:180},
                { text: 'Invoice line Instruction', dataIndex: 'invoicelineInstruction' ,width:180},
                { text: 'Division for Interface ERPORG', dataIndex: 'divisionforInterfaceERPORG' ,width:180},
                { text: 'Artwork hold', dataIndex: 'artworkhold',width:180 },
                { text: 'Artwork work attachment', dataIndex: 'artworkworkattachment' ,width:180 },
                { text: 'Variable Data Breakdown', dataIndex: 'variableDataBreakdown' ,width:180 },
                { text: 'Manufacturing notes', dataIndex: 'manufacturingnotes' ,width:180 },
                { text: 'Order type', dataIndex: 'ordertype' ,width:180 },
                { text: 'Order by', dataIndex: 'orderby' ,width:180 },
                { text: 'End customer', dataIndex: 'endcustomer' ,width:180 },
                { text: 'Shipping only notes', dataIndex: 'shippingonlynotes' ,width:180 },
                { text: 'Bank Charge', dataIndex: 'bankCharge' ,width:180 },
                { text: 'Freight Charge', dataIndex: 'freightCharge' ,width:180 },
                { text: 'Shipping hold', dataIndex: 'shippinghold' ,width:180 },
                { text: 'Production hold', dataIndex: 'productionhold' ,width:180 },
                { text: 'Split shipset', dataIndex: 'splitshipset' ,width:180 },
                { text: 'Agreement', dataIndex: 'agreement' ,width:180 },
                { text: 'Model Serial Number', dataIndex: 'modelSerialNumber' ,width:180 },
                { text: 'Waive MOQ', dataIndex: 'waiveMOQ' ,width:180 ,editor:'checkbox'},
                { text: 'APO Type', dataIndex: 'apoType' ,width:180 },
                { text: 'Sent To Oracle Date', dataIndex: 'sentToOracleDate' ,width:180 }
		];
    },
    tbar: { 
		height: 50,
	    items : 
	    	[
			 {
	              xtype:'button',
				  text:'Save',
				  handler:'saveOrderLine'
	         },
	         {
	              xtype:'button',
				  text:'Cancel',
				  handler:'cancelChanges'
	         }
			 ]
}
});