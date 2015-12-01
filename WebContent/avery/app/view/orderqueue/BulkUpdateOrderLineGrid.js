Ext.define('AOC.view.orderqueue.BulkUpdateOrderLineGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.bulkupdateorderlinegrid',
    itemId:'BulkUpdateOrderlineGrid',
    controller:'orderline',
    requires:['AOC.util.Helper'],
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
			    	 helper:AOC.util.Helper,
			    	 'selectionchange':function( grid, selection, eOpts ){
			    		 helper.BulkUpdate( grid, selection, eOpts);
			    	 }
		        	}
        });
        this.callParent(arguments);

    },
    buildColumns : function(){
    	var me=this;
    	helper = AOC.util.Helper;
        return [{ text: 'Customer PO Number',  dataIndex: 'customerPONumber', width:250},
                { text: 'Ordered Date ', dataIndex: 'orderedDate',width:100 },
                { text: 'Partner Customer Name', dataIndex: 'partnerCustomerName',width:170},
                { text: 'Customer Request Date', dataIndex: 'customerRequestDate',width:170},
                { text: 'Partner Vendor Name', dataIndex: 'partnerVendorName',width:170},
                { text: 'Ship To Customer', dataIndex: 'shipToCustomer',width:170 ,editor:'textfield'},
                { text: 'Ship To Contact', dataIndex: 'shipToContact',width:170,editor:'textfield'},
                { text: 'Ship To Address 1', dataIndex: 'shipToAddress1',width:170,editor:'textfield'},
                { text: 'Ship To Address 2', dataIndex: 'shipToAddress2',width:170,editor:'textfield'},
                { text: 'Ship To Address 3', dataIndex: 'shipToAddress3',width:170,editor:'textfield'},
                { text: 'Ship To City', dataIndex: 'shipToCity',width:170,editor:'textfield'},
                { text: 'Ship To Country', dataIndex: 'shipToCountry',width:170,editor:'textfield'},
                { text: 'Ship To State', dataIndex: 'shipToState',width:170,editor:'textfield'},
                { text: 'Ship To Zip', dataIndex: 'shipToZip',width:170,editor:'textfield'},
                { text: 'Ship To Email', dataIndex: 'shipToEmail',width:170,editor:'textfield'},
                { text: 'Ship To Fax', dataIndex: 'shiplToFax',width:170,editor:'textfield'},
                { text: 'Ship To Telephone', dataIndex: 'shipToTelephone',width:170,editor:'textfield'},
                { text: 'Bill To Customer', dataIndex: 'billToCustomer',width:170,editor:'textfield' },
                { text: 'Bill To Contact', dataIndex: 'billToContact',width:170,editor:'textfield'},
                { text: 'Bill To Address 1', dataIndex: 'billToAddress1',width:170 ,editor:'textfield'},
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
                { text: 'Bill To Email', dataIndex: 'billToEmail',width:170,editor:'textfield'},
                { text: 'Bill To Fax', dataIndex: 'billToFax',width:170,editor:'textfield'},
                { text: 'Bill To Telephone', dataIndex: 'billToTelephone',width:170,editor:'textfield'},
                { text: 'Requested Devlivery Date', dataIndex: 'requestedDevliveryDate',width:180},
                { text: 'Special Instruction', dataIndex: 'specialInstruction',width:170},
                { text: 'Order Received Date', dataIndex: 'orderReceivedDate',width:170},
                { text: 'Sold To RBONumber', dataIndex: 'soldTORBONumber' ,width:180 },
                { text: 'Oracle Bill to SiteNumber', dataIndex: 'oracleBilltoSiteNumber',width:190,editor:'textfield'},
                { text: 'Oracle Ship to Site Number', dataIndex: 'oracleShiptoSiteNumber' ,width:180,editor:'textfield' },
                { text: 'Shipping Method', dataIndex: 'shippingMethod',width:170,editor:{
                		xtype:'combo',
                		 displayField :'variableFieldName',
			             valueField :'variableFieldName',
                		store:Ext.data.StoreManager.lookup('ShippingMethodId')==null?helper.getVariableComboStore('ShippingMethod'):Ext.data.StoreManager.lookup('ShippingMethodId')
                	} 
                },
                { text: 'Retailer PO/Customer Job', dataIndex: 'retailerPO_CustomerJob',width:180,editor:'textfield'},
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
                { text: 'Promise Date', dataIndex: 'promiseDate',width:160,editor:'datefield'},
                { text: 'Freight Terms', dataIndex: 'freightTerms',width:160,editor:{
            		xtype:'combo',
           		 	displayField :'variableFieldName',
		            valueField :'variableFieldName',
		            store:Ext.data.StoreManager.lookup('FreightTermsId')==null?helper.getVariableComboStore('FreightTerms'):Ext.data.StoreManager.lookup('FreightTermsId')	
                	}  },
                { text: 'CSR', dataIndex: 'csr',width:160,editor:{
            		xtype:'combo',
           		 	displayField :'variableFieldName',
		            valueField :'variableFieldName',
		            store:Ext.data.StoreManager.lookup('CSRId')==null?helper.getVariableComboStore('CSR'):Ext.data.StoreManager.lookup('CSRId')	
                	} },
                { text: 'Packing Instruction', dataIndex: 'packingInstruction',width:180 ,editor:'textfield'},
                { text: 'Shipping Instructions', dataIndex: 'shippingInstructions',width:180,editor:'textfield'},
                { text: 'Invoice line Instruction', dataIndex: 'invoicelineInstruction' ,width:180,editor:'textfield'},
                { text: 'Division for Interface ERPORG', dataIndex: 'divisionforInterfaceERPORG' ,width:180,editor:'textfield'},
                { text: 'Artwork hold', dataIndex: 'artworkhold',width:180,editor:'checkbox' },
                { text: 'Artwork work attachment', dataIndex: 'artworkworkattachment' ,width:180 ,editor:'checkbox'},
                { text: 'Variable Data Breakdown', dataIndex: 'variableDataBreakdown' ,width:180,editor:'textfield' },
                { text: 'Manufacturing notes', dataIndex: 'manufacturingnotes' ,width:180,editor:'textfield' },
                { text: 'Order type', dataIndex: 'ordertype' ,width:180,editor:{
            		xtype:'combo',
           		 	displayField :'variableFieldName',
		            valueField :'variableFieldName',
		            store:Ext.data.StoreManager.lookup('OrderTypeId')==null?helper.getVariableComboStore('OrderType'):Ext.data.StoreManager.lookup('OrderTypeId')	
                	}  
                },
                { text: 'Order by', dataIndex: 'orderby' ,width:180 ,editor:'textfield'},
                { text: 'End customer', dataIndex: 'endcustomer' ,width:180 ,editor:{
            		xtype:'combo',
           		 	displayField :'variableFieldName',
		            valueField :'variableFieldName',
		            store:Ext.data.StoreManager.lookup('EndCustomerId')==null?helper.getVariableComboStore('EndCustomer'):Ext.data.StoreManager.lookup('EndCustomerId')	
                	}},
                { text: 'Shipping only notes', dataIndex: 'shippingonlynotes' ,width:180,editor:'textfield' },
                { text: 'Bank Charge', dataIndex: 'bankCharge' ,width:180,editor: {
                    xtype: 'numberfield',
                    maxLength :8,
                    minValue: 0
                }
                },
                { text: 'Freight Charge', dataIndex: 'freightCharge' ,width:180,editor: {
                    xtype: 'numberfield',
                    maxLength :8,
                    minValue: 0
                }
                },
                { text: 'Shipping hold', dataIndex: 'shippinghold' ,width:180 ,editor:'checkbox'},
                { text: 'Production hold', dataIndex: 'productionhold' ,width:180 ,editor:'checkbox'},
                { text: 'Split shipset', dataIndex: 'splitshipset' ,width:180,editor:{
            		xtype:'combo',
           		 	displayField :'variableFieldName',
		            valueField :'variableFieldName',
		            store:Ext.data.StoreManager.lookup('SplitShipsetId')==null?helper.getVariableComboStore('SplitShipset'):Ext.data.StoreManager.lookup('SplitShipsetId')	
                	} },
                { text: 'Agreement', dataIndex: 'agreement' ,width:180 ,editor:'textfield'},
                { text: 'Model Serial Number', dataIndex: 'modelSerialNumber' ,width:180 ,editor:'textfield'},
                { text: 'Waive MOQ', dataIndex: 'waiveMOQ' ,width:180 ,editor:'checkbox'},
                { text: 'APO Type', dataIndex: 'apoType' ,width:180,editor:{
            		xtype:'combo',
           		 	displayField :'variableFieldName',
		            valueField :'variableFieldName',
		            store:Ext.data.StoreManager.lookup('APOTypeId')==null?helper.getVariableComboStore('APOType'):Ext.data.StoreManager.lookup('APOTypeId')	
                	}},
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