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
        return [{ text: 'Customer PO #',  dataIndex: 'customerPONumber', width:250},
                { text: 'Ordered Date ', dataIndex: 'orderedDate',width:90  },
                { text: 'Partner Customer Name', dataIndex: 'partnerCustomerName',width:126},
                { text: 'Customer Request Date', dataIndex: 'customerRequestDate',width:91},
                { text: 'Partner Vendor Name', dataIndex: 'partnerVendorName',width:111},
                { text: 'Ship To Customer', dataIndex: 'shipToCustomer',width:170 ,editor:'textfield'},
                { text: 'Ship To Contact', dataIndex: 'shipToContact',width:170,editor:'textfield'},
                { text: 'Ship To Address 1', dataIndex: 'shipToAddress1',width:170,editor:'textfield'},
                { text: 'Ship To Address 2', dataIndex: 'shipToAddress2',width:170,editor:'textfield'},
                { text: 'Ship To Address 3', dataIndex: 'shipToAddress3',width:170,editor:'textfield'},
                { text: 'Ship To City', dataIndex: 'shipToCity',width:112,editor:'textfield'},
                { text: 'Ship To Country', dataIndex: 'shipToCountry',width:112,editor:'textfield'},
                { text: 'Ship To State', dataIndex: 'shipToState',width:112,editor:'textfield'},
                { text: 'Ship To Zip', dataIndex: 'shipToZip',width:85,editor:'textfield'},
                { text: 'Ship To Email', dataIndex: 'shipToEmail',width:170,editor:'textfield'},
                { text: 'Ship To Fax', dataIndex: 'shiplToFax',width:130,editor:'textfield'},
                { text: 'Ship To Telephone', dataIndex: 'shipToTelephone',width:130,editor:'textfield'},
                { text: 'Bill To Customer', dataIndex: 'billToCustomer',width:170,editor:'textfield' },
                { text: 'Bill To Contact', dataIndex: 'billToContact',width:170,editor:'textfield'},
                { text: 'Bill To Address 1', dataIndex: 'billToAddress1',width:170 ,editor:'textfield'},
                { text: 'Bill To Address 2', dataIndex: 'billToAddress2',width:170  ,editor:'textfield'},
                { text: 'Bill To Address 3', dataIndex: 'billToAddress3',width:170  ,editor:'textfield'},
                { text: 'Bill To City', dataIndex: 'billToCity',width:112 ,editor:'textfield'
                },
                { text: 'Bill To Country', dataIndex: 'billToCountry',width:112 ,editor:'textfield'
                },
                { text: 'Bill To State', dataIndex: 'billToState',width:112  ,editor:'textfield'
                },
                { text: 'Bill To Zip', dataIndex: 'billToZip',width:85,editor:'textfield'
                },
                { text: 'Bill To Email', dataIndex: 'billToEmail',width:170,editor:'textfield'},
                { text: 'Bill To Fax', dataIndex: 'billToFax',width:130,editor:'textfield'},
                { text: 'Bill To Telephone', dataIndex: 'billToTelephone',width:130,editor:'textfield'},
                { text: 'Requested Devlivery Date', dataIndex: 'requestedDevliveryDate',width:102},
                { text: 'Special Instruction', dataIndex: 'specialInstruction',width:170},
                { text: 'Order Received Date', dataIndex: 'orderReceivedDate',width:93},
                { text: 'Sold To RBO#', dataIndex: 'soldTORBONumber' ,width:100 },
                { text: 'Bill to Site #', dataIndex: 'oracleBilltoSiteNumber',width:100,editor:'textfield'},
                { text: 'Ship to Site #', dataIndex: 'oracleShiptoSiteNumber' ,width:100,editor:'textfield' },
                { text: 'Shipping Method', dataIndex: 'shippingMethod',width:170,editor:{
                		xtype:'combo',
                		 displayField :'variableFieldName',
			             valueField :'variableFieldName',
                		store:Ext.data.StoreManager.lookup('ShippingMethodId')==null?helper.getVariableComboStore('ShippingMethod'):Ext.data.StoreManager.lookup('ShippingMethodId')
                	} 
                },
                { text: 'Retailer PO/Customer Job', dataIndex: 'retailerPO_CustomerJob',width:115,editor:'textfield'},
                { text: 'Avery Item #', dataIndex: 'averyItemNumber',width:88  },
                { text: 'Customer Item #', dataIndex: 'customerItemNumber' ,width:88 },
                { text: 'Item Description', dataIndex: 'itemDescription',width:102  },
                { text: 'Customer Color Code', dataIndex: 'customerColorCode',width:102  },
                { text: 'Customer Color Description', dataIndex: 'customerColorDescription',width:102  },
                { text: 'Customer Size', dataIndex: 'customerSize',width:102  },
                { text: 'Customer Unit Price', dataIndex: 'customerUnitPrice',width:102 },
                { text: 'Customer Cost', dataIndex: 'customerCost',width:102  },
                { text: 'Contract #', dataIndex: 'contractNumber',width:130  },
                { text: 'Style No', dataIndex: 'styleNo',width:111 },
                { text: 'Customer Item # 1', dataIndex: 'customerItemNumber1',width:88},
                { text: 'Customer Item # 2', dataIndex: 'customerItemNumber2',width:88},
                { text: 'Customer Season', dataIndex: 'customerSeason' ,width:93 },
                { text: 'Customer UOM', dataIndex: 'customerUOM',width:93  },
                { text: 'Customer Ordered Qty.', dataIndex: 'customerOrderedQty',width:106  },
                { text: 'Calculated Orderded Qty.', dataIndex: 'calculatedOrderdedQty',width:106  },
                { text: 'Order Date', dataIndex: 'orderDate',width:88  },
                { text: 'Promise Date', dataIndex: 'promiseDate',width:88,editor:new Ext.form.DateField({
                	disabled : false,
                	format: 'Y-m-d'
                	}),
                	renderer: function(field) { 
                		var formated = Ext.util.Format.date(field, 'Y-m-d');
                		return formated;
                		}	
                		},
                { text: 'Freight Terms', dataIndex: 'freightTerms',width:130,editor:{
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
                { text: 'Invoice line Instruction', dataIndex: 'invoicelineInstruction' ,width:119,editor:'textfield'},
                { text: 'Division for Interface ERPORG', dataIndex: 'divisionforInterfaceERPORG' ,width:120,editor:'textfield'},
                { text: 'Artwork hold', dataIndex: 'artworkhold',width:84,editor:'checkbox' },
                { text: 'Artwork work attachment', dataIndex: 'artworkworkattachment' ,width:110 ,editor:'checkbox'},
                { text: 'Variable Data Breakdown', dataIndex: 'variableDataBreakdown' ,width:110,editor:'textfield' },
                { text: 'Manufacturing notes', dataIndex: 'manufacturingnotes' ,width:107,editor:'textfield' },
                { text: 'Order type', dataIndex: 'ordertype' ,width:115,editor:{
            		xtype:'combo',
           		 	displayField :'variableFieldName',
		            valueField :'variableFieldName',
		            store:Ext.data.StoreManager.lookup('OrderTypeId')==null?helper.getVariableComboStore('OrderType'):Ext.data.StoreManager.lookup('OrderTypeId')	
                	}  
                },
                { text: 'Order by', dataIndex: 'orderby' ,width:115 ,editor:'textfield'},
                { text: 'End customer', dataIndex: 'endcustomer' ,width:115 ,editor:{
            		xtype:'combo',
           		 	displayField :'variableFieldName',
		            valueField :'variableFieldName',
		            store:Ext.data.StoreManager.lookup('EndCustomerId')==null?helper.getVariableComboStore('EndCustomer'):Ext.data.StoreManager.lookup('EndCustomerId')	
                	}},
                { text: 'Shipping only notes', dataIndex: 'shippingonlynotes' ,width:150,editor:'textfield' },
                { text: 'Bank Charge', dataIndex: 'bankCharge' ,width:90,editor: {
                    xtype: 'numberfield',
                    maxLength :8,
                    minValue: 0
                }
                },
                { text: 'Freight Charge', dataIndex: 'freightCharge' ,width:90,editor: {
                    xtype: 'numberfield',
                    maxLength :8,
                    minValue: 0
                }
                },
                { text: 'Shipping hold', dataIndex: 'shippinghold' ,width:83 ,editor:'checkbox'},
                { text: 'Production hold', dataIndex: 'productionhold' ,width:77 ,editor:'checkbox'},
                { text: 'Split shipset', dataIndex: 'splitshipset' ,width:81,editor:{
            		xtype:'combo',
           		 	displayField :'variableFieldName',
		            valueField :'variableFieldName',
		            store:Ext.data.StoreManager.lookup('SplitShipsetId')==null?helper.getVariableComboStore('SplitShipset'):Ext.data.StoreManager.lookup('SplitShipsetId')	
                	} },
                { text: 'Agreement', dataIndex: 'agreement' ,width:102 ,editor:'textfield'},
                { text: 'Model Serial Number', dataIndex: 'modelSerialNumber' ,width:180 ,editor:'textfield'},
                { text: 'Waive MOQ', dataIndex: 'waiveMOQ' ,width:59 ,editor:'checkbox'},
                { text: 'APO Type', dataIndex: 'apoType' ,width:47,editor:{
            		xtype:'combo',
           		 	displayField :'variableFieldName',
		            valueField :'variableFieldName',
		            store:Ext.data.StoreManager.lookup('APOTypeId')==null?helper.getVariableComboStore('APOType'):Ext.data.StoreManager.lookup('APOTypeId')	
                	}},
                { text: 'Sent To Oracle Date', dataIndex: 'sentToOracleDate' ,width:100 }
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